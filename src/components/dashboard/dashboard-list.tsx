import { BiPencil, BiTrash } from "react-icons/bi";
import type { ITask } from "../../types/task";
import { FaFloppyDisk } from "react-icons/fa6";
import { ConfirmDialog } from "./confirm-dialog";
import { useState } from "react";

export default function DashboardList({
  tasks,
  onCheckHandler,
  onEditHandler,
  onDeleteHandler,
}: Readonly<{
  tasks: ITask[];
  onCheckHandler: (taskId: number) => void;
  onEditHandler: (taskId: number, latestDescription?: string) => void;
  onDeleteHandler: (taskId: number) => void;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(0);
  const [editedTasks, setEditedTasks] = useState<Record<number, string>>({});

  return (
    <>
      <div className="bg-neutral-100 pt-10 md:p-10 flex flex-col gap-5">
        <div className="bg-white p-5">
          {tasks.length > 0 &&
            tasks.map((task) => {
              const editedTask = editedTasks[task.id] ?? task.description;
              
              return (
                <div
                  key={`${task.id}`}
                  className="flex bg-white border-b-neutral-200 border-b px-3 py-5 justify-between"
                >
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      readOnly
                      onClick={() => {
                        onCheckHandler(task.id);
                      }}
                    />
                    {task.is_editing ? (
                      <input
                        type="text"
                        className="p-2 rounded-xl bg-gray-200 w-full"
                        value={editedTask}
                        onChange={(e) => {
                          setEditedTasks(prev => ({
                            ...prev,
                            [task.id]: e.target.value
                          }));
                        }}
                      />
                    ) : (
                      <span
                        className={`${task.is_completed && "line-through"}`}
                      >
                        {task.description}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => {
                        onEditHandler(task.id, editedTask);
                      }}>
                      {task.is_editing ? (
                        <FaFloppyDisk className="w-4 h-4" />
                      ) : (
                        <BiPencil className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setToDeleteId(task.id);
                        setIsModalOpen(true);
                      }}
                    >
                      <BiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <ConfirmDialog
        onConfirm={() => {
          onDeleteHandler(toDeleteId);
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}