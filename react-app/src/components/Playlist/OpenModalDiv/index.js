import React from 'react';
import { useModal } from '../../../context/Modal';

function OpenModalDiv({ children, modalComponent, onModalClose }) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
}

export default OpenModalDiv;
