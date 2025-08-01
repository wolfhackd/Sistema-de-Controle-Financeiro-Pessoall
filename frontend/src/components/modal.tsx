import type { ReactNode } from 'react';
import { Button } from './ui/button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 shadow-lg relative w-full max-w-md">
        <Button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
          variant={'outline'}
        >
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};
