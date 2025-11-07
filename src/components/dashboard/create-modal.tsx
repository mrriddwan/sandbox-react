import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import Modal from "../shared/modal";

export default function CreateModal({
  isOpen,
  onClose,
  onCreateHandler,
}: Readonly<{
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateHandler: (task: string) => Promise<void>;
}>) {
  const [newTask, setNewTask] = useState("");

  const handleCreate = async () => {
    if (newTask.trim()) {
      await onCreateHandler(newTask);
      setNewTask(""); // Clear input after creation
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <button className="flex justify-start items-center gap-2">
        <PiPlus className="w-4 h-4" />
        <h2 className="text-2xl">New Task</h2>
      </button>
      <input
        className="w-full  p-3 rounded-xl bg-gray-200 "
        placeholder="Task Name"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
      <button
        className="text-white flex gap-2 bg-blue-400 rounded-md p-3 justify-center items-center"
        onClick={handleCreate}
      >
        <BiPlus className="w-4 h-4" />
        <span>New Task</span>
      </button>
    </Modal>
  );
}
