import React from 'react';
import ReactModal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Exit } from './styles';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  noPadding?: boolean;
  handleClose: () => void;
}

const Modal: React.FC<Props & ReactModal.Props> = ({
  children,
  noPadding = false,
  handleClose,
  isOpen,
  ...rest
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      {...rest}
      style={{
        overlay: {
          backgroundColor: 'var(--background)',
          overflow: 'hidden',
        },
        content: {
          overflow: 'hidden',
          display: 'flex',
          backgroundColor: 'var(--background-secondary)',
          color: 'var(--text)',
          border: 0,
          boxShadow: '0 0 0.2em var(--background)',
          padding: noPadding ? 0 : 15,
        },
      }}>
      {children}
      <Exit onClick={handleClose}>
        <AiFillCloseCircle color="red" size={24} />
      </Exit>
    </ReactModal>
  );
};

export default Modal;
