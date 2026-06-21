import { OrderBookHero } from '@/components/hero/OrderBookHero';
import { TickerTape } from '@/components/shell/TickerTape';
import { Manifesto } from '@/components/sections/Manifesto';
import { Throughline } from '@/components/sections/Throughline';
import { PositionBlotter } from '@/components/sections/PositionBlotter';
import { Instruments } from '@/components/sections/Instruments';
import { EngineDeepDive } from '@/components/sections/EngineDeepDive';
import { Inference } from '@/components/sections/Inference';
import { ResearchLab } from '@/components/sections/ResearchLab';
import { SystemSpec } from '@/components/sections/SystemSpec';
import { Terminal } from '@/components/sections/Terminal';
import { Contact } from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <OrderBookHero />
      <TickerTape />
      <Manifesto />
      <Throughline />
      <PositionBlotter />
      <Instruments />
      <EngineDeepDive />
      <Inference />
      <ResearchLab />
      <SystemSpec />
      <Terminal />
      <TickerTape reverse />
      <Contact />
    </>
  );
}
