import { useState } from "react";
import type { ITask } from "../types/task";

export const useTask = () => {
  //state
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState("");
  const filteredTasks = tasks.filter((task: ITask) =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  //modal disclosure
  const [isModalOpen, setIsModalOpen] = useState(false);

  //handlers
  const onCreateTask = (task: string) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      description: task,
      is_completed: false,
      is_editing: false,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const onCheckHandler = (taskId: number) => {
    const updatedTasks = tasks.map((task: ITask) => {
      if (task.id === taskId) {
        return { ...task, is_completed: !task.is_completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onEditHandler = (taskId: number, latestDescription?: string) => {
    const updatedTasks = tasks.map((task: ITask) => {
      if (task.id === taskId) {
        return {
          ...task,
          is_editing: !task.is_editing,
          description: latestDescription || task.description,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDeleteHandler = (taskId: number) => {
    const updatedTasks = tasks.filter((task: ITask) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return {
    tasks,
    filteredTasks,
    search,
    isModalOpen,
    setSearch,
    onCreateTask,
    onCheckHandler,
    onEditHandler,
    onDeleteHandler,
    setIsModalOpen,
  };
};
