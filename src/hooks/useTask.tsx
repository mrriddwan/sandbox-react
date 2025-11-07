import { useEffect, useState } from "react";
import type { ITask } from "../types/task";
import { taskService } from "../services/task.service";
import { useUserContext } from "../contexts/userContext";

export const useTask = () => {
  //state
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userContext } = useUserContext();
  
  const filteredTasks = tasks.filter((task: ITask) =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  //modal disclosure
  const [isModalOpen, setIsModalOpen] = useState(false);

  //handlers
  const onCreateTask = async (task: string) => {
    if (!userContext.id) {
      console.error("User not authenticated");
      return;
    }

    if (!task.trim()) {
      console.error("Task description cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const taskId = await taskService.createTask(task, userContext.id);
      const newTask: ITask = {
        id: taskId,
        description: task,
        is_completed: false,
        is_editing: false,
      };
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckHandler = (taskId: string | number) => {
    const updatedTasks = tasks.map((task: ITask) => {
      if (task.id === taskId) {
        return { ...task, is_completed: !task.is_completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onEditHandler = (taskId: string | number, latestDescription?: string) => {
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

  const onDeleteHandler = (taskId: string | number) => {
    const updatedTasks = tasks.filter((task: ITask) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userContext.id) {
        console.error("User not authenticated");
        return;
      }
      const tasks = await taskService.getUserTasks(userContext.id as string);
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  return {
    tasks,
    filteredTasks,
    search,
    isModalOpen,
    isLoading,
    setSearch,
    onCreateTask,
    onCheckHandler,
    onEditHandler,
    onDeleteHandler,
    setIsModalOpen,
  };
};
