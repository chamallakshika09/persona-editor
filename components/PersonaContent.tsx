'use client';

import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import NameCard from './NameCard';
import TextCard from './TextCard';
import { CardData } from '@/types/ui';
import CardColumn from './CardColumn';
import Loader from './Loader';
import { initializeYjs } from '@/libs/yjs/yjsInstance';

export default function PersonaContent() {
  const [leftColumnCards, setLeftColumnCards] = useState<CardData[]>([]);
  const [rightColumnCards, setRightColumnCards] = useState<CardData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeYjs(() => {
      setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return (
      <>
        <div className="absolute top-0 left-0 flex items-center justify-center z-50 w-full">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#F3EEEC] w-full flex flex-row">
      <div className="flex flex-col p-4 gap-3">
        <ImageCard />
        <CardColumn cards={leftColumnCards} setCards={setLeftColumnCards} />
      </div>
      <div className="flex flex-col p-4 gap-3 border-l border-[#DED7D5]">
        <NameCard />
        <TextCard />
        <CardColumn cards={rightColumnCards} setCards={setRightColumnCards} />
      </div>
    </div>
  );
}
