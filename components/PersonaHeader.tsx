'use client';

import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import React, { useState } from 'react';
import QuickEditModal from './QuickEditModal';
import PersonaBadge from './PersonaBadge';
import { usePersona } from '@/contexts/PersonaContext';
import PencilIcon from '@/assets/icons/Pencil.icon';

export default function PersonaHeader() {
  const { name, selectedAvatar, selectedColor } = usePersona();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const foundAvatar = PERSONA_ICONS.find((icon) => icon.name === selectedAvatar);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center p-4 rounded-lg gap-4 relative">
      <PersonaBadge
        icon={foundAvatar?.icon}
        height="h-[25px]"
        divClasses="rounded-md w-10 h-10 p-1.5"
        bgColor={selectedColor}
      />
      <h1 className="ml-4 text-2xl font-bold text-textPrimary">{name}</h1>
      <button onClick={handleOpenModal}>
        <PencilIcon />
      </button>
      {isModalOpen && <QuickEditModal onClose={handleCloseModal} />}
    </div>
  );
}
