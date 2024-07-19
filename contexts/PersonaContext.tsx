'use client';

import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import { colors } from '@/data/colors';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { CardData } from '@/types/ui';
import { getNewCard } from '@/utils/cards';

type ContextValueType = {
  name: string;
  setName: (name: string) => void;
  selectedAvatar: string;
  setSelectedAvatar: (selectedAvatar: string) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
  leftColumnCards: CardData[];
  setLeftColumnCards: Dispatch<SetStateAction<CardData[]>>;
  rightColumnCards: CardData[];
  setRightColumnCards: Dispatch<SetStateAction<CardData[]>>;
};

const PersonaContext = createContext<ContextValueType | undefined>(undefined);

export const PersonaProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('New persona');
  const [selectedAvatar, setSelectedAvatar] = useState(PERSONA_ICONS[4].name);
  const [selectedColor, setSelectedColor] = useState(colors[4]);
  const [leftColumnCards, setLeftColumnCards] = useState<CardData[]>([getNewCard('image')]);
  const [rightColumnCards, setRightColumnCards] = useState<CardData[]>([getNewCard('text')]);

  return (
    <PersonaContext.Provider
      value={{
        name,
        setName,
        selectedAvatar,
        setSelectedAvatar,
        selectedColor,
        setSelectedColor,
        leftColumnCards,
        setLeftColumnCards,
        rightColumnCards,
        setRightColumnCards,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};
