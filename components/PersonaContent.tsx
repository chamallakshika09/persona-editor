'use client';

import NameCard from './NameCard';
import { usePersona } from '@/contexts/PersonaContext';
import CardColumn from './CardColumn';

export default function PersonaContent() {
  const { leftColumnCards, rightColumnCards } = usePersona();

  return (
    <div className="bg-[#F3EEEC] w-full flex flex-row">
      <div className="flex flex-col p-4 gap-3">
        <CardColumn cards={leftColumnCards} column="left" />
      </div>
      <div className="flex flex-col p-4 gap-3 border-l border-[#DED7D5]">
        <NameCard />
        <CardColumn cards={rightColumnCards} column="right" />
      </div>
    </div>
  );
}
