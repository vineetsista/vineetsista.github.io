// Client-side synthetic market-data simulator.
// GBM mid price + mean-reverting depth (breathing book) + Poisson market orders
// that lift/hit the book and nudge the mid. No backend — pure deterministic-ish sim.

export interface Level {
  price: number;
  size: number; // resting size at this level
  prevSize: number; // for green/red flash on change
  cum: number; // cumulative size from top of book (for depth chart)
}

export interface BookSnapshot {
  bids: Level[]; // descending price
  asks: Level[]; // ascending price
  mid: number;
  spread: number;
  lastPrice: number;
  lastSide: 'bid' | 'ask' | null;
  seq: number;
}

const TICK = 0.01;

function round2(x: number): number {
  return Math.round(x / TICK) * TICK;
}

export interface SimConfig {
  levels: number;
  startMid: number;
  vol: number; // GBM volatility per step
  marketOrderProb: number; // chance of a market order per step
  light?: boolean;
}

export const DEFAULT_CONFIG: SimConfig = {
  levels: 11,
  startMid: 187.42,
  vol: 0.00045,
  marketOrderProb: 0.22,
};

export class OrderBookSim {
  private cfg: SimConfig;
  private mid: number;
  private spreadTicks = 2;
  private bidSizes: number[];
  private askSizes: number[];
  private baseSizes: number[];
  private seq = 0;
  private lastPrice: number;
  private lastSide: 'bid' | 'ask' | null = null;

  constructor(cfg: Partial<SimConfig> = {}) {
    this.cfg = { ...DEFAULT_CONFIG, ...cfg };
    this.mid = this.cfg.startMid;
    this.lastPrice = this.cfg.startMid;
    const n = this.cfg.levels;
    // base liquidity profile: thin at top of book, thicker deeper, with shape.
    this.baseSizes = Array.from({ length: n }, (_, i) => {
      const depth = i / n;
      return 120 + depth * 1400 + Math.sin(i * 1.7) * 90;
    });
    this.bidSizes = this.baseSizes.map((b) => b * (0.7 + Math.random() * 0.6));
    this.askSizes = this.baseSizes.map((b) => b * (0.7 + Math.random() * 0.6));
  }

  private gaussian(): number {
    // Box-Muller
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  step(): BookSnapshot {
    this.seq += 1;
    // 1) GBM drift on the mid.
    const shock = this.gaussian() * this.cfg.vol;
    this.mid = this.mid * Math.exp(shock);

    // 2) spread breathes between 1 and 4 ticks.
    if (Math.random() < 0.15) {
      this.spreadTicks = Math.max(1, Math.min(4, this.spreadTicks + (Math.random() < 0.5 ? -1 : 1)));
    }

    // 3) mean-reverting resting size per depth (Poisson-ish add/cancel flow).
    for (let i = 0; i < this.cfg.levels; i += 1) {
      const target = this.baseSizes[i];
      const revert = 0.08;
      const noise = (Math.random() - 0.5) * target * 0.22;
      this.bidSizes[i] += (target - this.bidSizes[i]) * revert + noise;
      this.askSizes[i] += (target - this.askSizes[i]) * revert + noise;
      this.bidSizes[i] = Math.max(20, this.bidSizes[i]);
      this.askSizes[i] = Math.max(20, this.askSizes[i]);
    }

    // 4) occasional market order lifts the ask or hits the bid.
    this.lastSide = null;
    if (Math.random() < this.cfg.marketOrderProb) {
      const buy = Math.random() < 0.5;
      const depth = Math.random() < 0.7 ? 0 : 1;
      const take = this.baseSizes[depth] * (0.4 + Math.random() * 0.8);
      if (buy) {
        this.askSizes[depth] = Math.max(20, this.askSizes[depth] - take);
        this.mid = this.mid * (1 + this.cfg.vol * 0.9);
        this.lastSide = 'ask';
        this.lastPrice = this.askPriceAt(0);
      } else {
        this.bidSizes[depth] = Math.max(20, this.bidSizes[depth] - take);
        this.mid = this.mid * (1 - this.cfg.vol * 0.9);
        this.lastSide = 'bid';
        this.lastPrice = this.bidPriceAt(0);
      }
    }

    return this.snapshot();
  }

  /** Fire an explicit market order (used by the deep-dive interaction). */
  fireMarket(side: 'buy' | 'sell', qty = 600): BookSnapshot {
    this.seq += 1;
    let remaining = qty;
    if (side === 'buy') {
      for (let i = 0; i < this.cfg.levels && remaining > 0; i += 1) {
        const fill = Math.min(this.askSizes[i], remaining);
        this.askSizes[i] = Math.max(20, this.askSizes[i] - fill);
        remaining -= fill;
      }
      this.mid = this.mid * (1 + this.cfg.vol * 4);
      this.lastSide = 'ask';
      this.lastPrice = this.askPriceAt(0);
    } else {
      for (let i = 0; i < this.cfg.levels && remaining > 0; i += 1) {
        const fill = Math.min(this.bidSizes[i], remaining);
        this.bidSizes[i] = Math.max(20, this.bidSizes[i] - fill);
        remaining -= fill;
      }
      this.mid = this.mid * (1 - this.cfg.vol * 4);
      this.lastSide = 'bid';
      this.lastPrice = this.bidPriceAt(0);
    }
    return this.snapshot();
  }

  private bestBid(): number {
    return round2(this.mid - (this.spreadTicks / 2) * TICK);
  }

  private bestAsk(): number {
    return round2(this.mid + (this.spreadTicks / 2) * TICK);
  }

  private bidPriceAt(i: number): number {
    return round2(this.bestBid() - i * TICK);
  }

  private askPriceAt(i: number): number {
    return round2(this.bestAsk() + i * TICK);
  }

  private prevBids: number[] = [];
  private prevAsks: number[] = [];

  private snapshot(): BookSnapshot {
    const bids: Level[] = [];
    const asks: Level[] = [];
    let cumB = 0;
    let cumA = 0;
    for (let i = 0; i < this.cfg.levels; i += 1) {
      const bSize = Math.round(this.bidSizes[i]);
      const aSize = Math.round(this.askSizes[i]);
      cumB += bSize;
      cumA += aSize;
      bids.push({
        price: this.bidPriceAt(i),
        size: bSize,
        prevSize: this.prevBids[i] ?? bSize,
        cum: cumB,
      });
      asks.push({
        price: this.askPriceAt(i),
        size: aSize,
        prevSize: this.prevAsks[i] ?? aSize,
        cum: cumA,
      });
    }
    this.prevBids = bids.map((l) => l.size);
    this.prevAsks = asks.map((l) => l.size);
    return {
      bids,
      asks,
      mid: round2(this.mid),
      spread: round2(this.bestAsk() - this.bestBid()),
      lastPrice: round2(this.lastPrice),
      lastSide: this.lastSide,
      seq: this.seq,
    };
  }

  /** A well-composed static snapshot for reduced-motion / SSR. */
  static staticSnapshot(cfg: Partial<SimConfig> = {}): BookSnapshot {
    const sim = new OrderBookSim(cfg);
    let snap = sim.snapshot();
    for (let i = 0; i < 40; i += 1) snap = sim.step();
    return snap;
  }
}
