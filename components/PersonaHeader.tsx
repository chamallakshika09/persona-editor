import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import React from 'react';
import QuickEditModal from './QuickEditModal';
import PersonaBadge from './PersonaBadge';

export default function PersonaHeader() {
  return (
    <div className="flex items-center p-4 rounded-lg gap-4 relative">
      <PersonaBadge icon={PERSONA_ICONS[4].icon} height="h-[25px]" divClasses="rounded-md w-10 h-10 p-1.5" />
      <h1 className="ml-4 text-2xl font-bold text-grayDark">New persona</h1>
      <QuickEditModal />
    </div>
  );
}
