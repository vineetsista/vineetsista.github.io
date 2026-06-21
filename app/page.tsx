import { OrderBookHero } from '@/components/hero/OrderBookHero';
import { Throughline } from '@/components/sections/Throughline';
import { PositionBlotter } from '@/components/sections/PositionBlotter';
import { Instruments } from '@/components/sections/Instruments';
import { EngineDeepDive } from '@/components/sections/EngineDeepDive';
import { ResearchLab } from '@/components/sections/ResearchLab';
import { SystemSpec } from '@/components/sections/SystemSpec';
import { Terminal } from '@/components/sections/Terminal';
import { Contact } from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <OrderBookHero />
      <Throughline />
      <PositionBlotter />
      <Instruments />
      <EngineDeepDive />
      <ResearchLab />
      <SystemSpec />
      <Terminal />
      <Contact />
    </>
  );
}
