import { useModal } from "../../../context/Modal";

function OpenModalDiv({
  modalComponent, // component to render inside the modal
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <div onClick={onClick}>
    </div>
  );
}

export default OpenModalDiv
