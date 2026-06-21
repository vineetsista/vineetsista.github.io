// ET clock + real NYSE market-status calculation (weekends/holidays = closed).

const ET_TZ = 'America/New_York';

export interface ETParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: number; // 0=Sun .. 6=Sat
  label: string; // HH:MM:SS
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

export function getETParts(now: Date): ETParts {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: ET_TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    weekday: 'short', hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';
  let hour = parseInt(get('hour'), 10);
  if (hour === 24) hour = 0; // some engines emit 24 for midnight
  const year = parseInt(get('year'), 10);
  const month = parseInt(get('month'), 10);
  const day = parseInt(get('day'), 10);
  const minute = parseInt(get('minute'), 10);
  const second = parseInt(get('second'), 10);
  const weekday = WEEKDAY_INDEX[get('weekday')] ?? 0;
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    year, month, day, hour, minute, second, weekday,
    label: `${pad(hour)}:${pad(minute)}:${pad(second)}`,
  };
}

// US market holidays (NYSE) for the relevant range — observed dates.
const HOLIDAYS = new Set<string>([
  // 2025
  '2025-01-01', '2025-01-20', '2025-02-17', '2025-04-18', '2025-05-26',
  '2025-06-19', '2025-07-04', '2025-09-01', '2025-11-27', '2025-12-25',
  // 2026
  '2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25',
  '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25',
  // 2027
  '2027-01-01', '2027-01-18', '2027-02-15', '2027-03-26', '2027-05-31',
  '2027-06-18', '2027-07-05', '2027-09-06', '2027-11-25', '2027-12-24',
]);

export type MarketState = 'OPEN' | 'CLOSED' | 'PRE' | 'AFTER';

export interface MarketStatus {
  state: MarketState;
  detail: string;
}

export function getMarketStatus(p: ETParts): MarketStatus {
  const dateKey = `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
  const isWeekend = p.weekday === 0 || p.weekday === 6;
  const isHoliday = HOLIDAYS.has(dateKey);
  const minutes = p.hour * 60 + p.minute;
  const open = 9 * 60 + 30; // 09:30 ET
  const close = 16 * 60; // 16:00 ET
  const preOpen = 4 * 60; // 04:00 ET
  const afterClose = 20 * 60; // 20:00 ET

  if (isWeekend) return { state: 'CLOSED', detail: 'WEEKEND' };
  if (isHoliday) return { state: 'CLOSED', detail: 'HOLIDAY' };
  if (minutes >= open && minutes < close) return { state: 'OPEN', detail: 'REGULAR' };
  if (minutes >= preOpen && minutes < open) return { state: 'PRE', detail: 'PRE-MKT' };
  if (minutes >= close && minutes < afterClose) return { state: 'AFTER', detail: 'AFTER-HRS' };
  return { state: 'CLOSED', detail: 'OVERNIGHT' };
}
