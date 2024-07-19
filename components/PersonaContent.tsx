'use client';

import NameCard from './NameCard';
import CardColumn from './CardColumn';
import { useY } from 'react-yjs';
import { yLeftColumnCards, yRightColumnCards } from '@/libs/yjsInstance';
import { convertObjArrToCardDataArr } from '@/utils/cards';

export default function PersonaContent() {
  // const leftColumnCards = convertObjArrToCardDataArr(useY(yLeftColumnCards));
  // const rightColumnCards = convertObjArrToCardDataArr(useY(yRightColumnCards));

  const leftColumnCards = useY(yLeftColumnCards);
  const rightColumnCards = useY(yRightColumnCards);

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
