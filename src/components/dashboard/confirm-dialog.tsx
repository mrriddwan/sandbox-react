import Modal from "../shared/modal";

export const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h1>Are you sure you want to delete this task?</h1>
      <div className="flex gap-2 w-fit mx-auto">
        <button
          className={"bg-green-300 rounded-2xl py-3 px-5"}
          onClick={() => onConfirm()}
        >
          Yes
        </button>
        <button
          className={"bg-red-300 rounded-2xl py-3 px-5"}
          onClick={() => onCancel()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};
