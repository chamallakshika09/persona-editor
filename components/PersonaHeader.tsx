'use client';

import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import QuickEditButton from './QuickEditButton';
import PersonaBadge from './PersonaBadge';

import { useY } from 'react-yjs';
import { yName, ySelectedAvatar, ySelectedColor } from '@/libs/yjs/yjsInstance';

export default function PersonaHeader() {
  const name = useY(yName()).toString();
  const selectedAvatar = useY(ySelectedAvatar()).toString();
  const selectedColor = useY(ySelectedColor()).toString();

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
