'use client';

import PencilIcon from '@/assets/icons/Pencil.icon';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import React from 'react';
import SvgIcon from './SvgIcon';

export default function PersonaHeader() {
  return (
    <div className="flex items-center p-4 rounded-lg gap-4">
      <div className="rounded-md w-10 h-10 bg-avatarBg p-1.5 flex items-center justify-center">
        <SvgIcon icon={PERSONA_ICONS[4].icon} className="h-[25px] w-auto" />
      </div>
      <h1 className="ml-4 text-2xl font-bold text-grayDark">New persona</h1>
      <button>
        <PencilIcon />
      </button>
    </div>
  );
}
