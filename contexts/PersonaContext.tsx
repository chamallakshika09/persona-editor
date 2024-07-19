'use client';

import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import { colors } from '@/data/colors';
import { createContext, useState, ReactNode, useContext } from 'react';

type ContextValueType = {
  name: string;
  setName: (name: string) => void;
  selectedAvatar: string;
  setSelectedAvatar: (selectedAvatar: string) => void;
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
};

const PersonaContext = createContext<ContextValueType | undefined>(undefined);

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState('New persona');
  const [selectedAvatar, setSelectedAvatar] = useState(PERSONA_ICONS[4].name);
  const [selectedColor, setSelectedColor] = useState(colors[4]);

  return (
    <PersonaContext.Provider
      value={{ name, setName, selectedAvatar, setSelectedAvatar, selectedColor, setSelectedColor }}
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
