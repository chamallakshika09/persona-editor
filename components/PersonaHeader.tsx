'use client';

import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import React from 'react';
import PersonaBadge from './PersonaBadge';
import { usePersona } from '@/contexts/PersonaContext';
import QuickEditButton from './QuickEditButton';

export default function PersonaHeader() {
  const { name, selectedAvatar, selectedColor } = usePersona();
  const foundAvatar = PERSONA_ICONS.find((icon) => icon.name === selectedAvatar);

  return (
    <div className="flex items-center p-4 rounded-lg gap-4 relative">
      <PersonaBadge
        icon={foundAvatar?.icon}
        height="h-[25px]"
        divClasses="rounded-md w-10 h-10 p-1.5"
        bgColor={selectedColor}
      />
      <h1 className="ml-4 text-2xl font-bold text-textPrimary">{name}</h1>
      <QuickEditButton />
    </div>
  );
}
