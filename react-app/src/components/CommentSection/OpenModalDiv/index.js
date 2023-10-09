import { useModal } from "../../../context/Modal";

function OpenModalDiv({
  modalComponent, // component to render inside the modal
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <div onClick={onClick}>
      <div className="dropdown-individual-container onecomment-delete-container">
        <i class="fa-regular fa-trash-can"></i>
        <p>delete</p>
      </div>
    </div>
  );
}

export default OpenModalDiv
