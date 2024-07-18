'use client';

import { useState } from 'react';
import ImageCard from './ImageCard';
import NameCard from './NameCard';
import TextCard from './TextCard';
import { CardData } from '@/types/ui';
import AddCardMenu from './AddCardMenu';

export default function PersonaContent() {
  const [leftColumnCards, setLeftColumnCards] = useState<CardData[]>([]);
  const [rightColumnCards, setRightColumnCards] = useState<CardData[]>([]);

  return (
    <div className="bg-[#F3EEEC] w-full flex flex-row">
      <div className="flex flex-col p-4 gap-3">
        <ImageCard />
        {leftColumnCards.map((card) => {
          switch (card.type) {
            case 'text':
              return <TextCard key={card.id} />;
            case 'image':
              return <ImageCard key={card.id} />;
          }
        })}
        <AddCardMenu cards={leftColumnCards} setCards={setLeftColumnCards} />
      </div>
      <div className="flex flex-col p-4 gap-3 border-l border-[#DED7D5]">
        <NameCard />
        <TextCard />
        {rightColumnCards.map((card) => {
          switch (card.type) {
            case 'text':
              return <TextCard key={card.id} />;
            case 'image':
              return <ImageCard key={card.id} />;
          }
        })}
        <AddCardMenu cards={rightColumnCards} setCards={setRightColumnCards} />
      </div>
    </div>
  );
}
