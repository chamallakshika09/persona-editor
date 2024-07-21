import { ReactNode } from 'react';
import CloseIcon from '@/assets/icons/Close.icon';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="absolute top-full left-0 flex items-center justify-center z-50">
        <div className="bg-white w-[420px] rounded-xl shadow-lg p-4 border border-[#E6E6E6] flex flex-col gap-4">
          {children}
        </div>
      </div>
    </>
  );
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold flex-grow">{title}</h2>
      <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
}

interface ModalContentProps {
  children: ReactNode;
}

function ModalContent({ children }: ModalContentProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

interface ModalActionsProps {
  children: ReactNode;
}

function ModalActions({ children }: ModalActionsProps) {
  return <div className="flex justify-end gap-2">{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;
