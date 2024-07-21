import { useState } from 'react';
import PencilIcon from '@/assets/icons/Pencil.icon';
import QuickEditModal from './QuickEditModal';

export default function QuickEditButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>
        <PencilIcon />
      </button>
      {isModalOpen && <QuickEditModal onClose={handleCloseModal} />}
    </>
  );
}
