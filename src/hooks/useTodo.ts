import { ChangeEvent, useState } from 'react';

type Task = {
  label: string;
  isCompleted: boolean;
  originalIsCompleted: boolean;
  isDeleted: boolean;
  madeDate?: Date;
};

type UseTodo = () => {
  taskList: Task[];
  handleSetInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
  taskLabel: string;
  handleDeleteTask: (index: number) => void;
  handleTaskComplete: (index: number) => void;
  undoDeleteTask: (index: number) => void;
};

export const useTodo: UseTodo = () => {
  const [taskLabel, setTaskLabel] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleAddTask = () => {
    if (!taskLabel.trim()) {
      return;
    }
    setTaskList((prevState) => [
      ...prevState,
      { label: taskLabel, isCompleted: false, originalIsCompleted: false, isDeleted: false },
    ]);
    setTaskLabel('');
  };

  const handleDeleteTask = (index: number) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((prevTask, subIndex) =>
        subIndex === index
          ? {
              ...prevTask,
              isCompleted: true,
              originalIsCompleted: prevTask.isCompleted,
              isDeleted: true,
            }
          : prevTask,
      ),
    );
  };

  const undoDeleteTask = (index: number) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((prevTask, subIndex) =>
        subIndex === index
          ? {
              ...prevTask,
              isCompleted: prevTask.originalIsCompleted,
              isDeleted: false,
            }
          : prevTask,
      ),
    );
  };

  const handleTaskComplete = (index: number) => {
    setTaskList((prevTaskList) =>
      prevTaskList.map((prevTask, subIndex) =>
        // 完了をトグルにする
        subIndex === index ? { ...prevTask, isCompleted: !prevTask.isCompleted } : prevTask,
      ),
    );
  };

  return {
    taskList,
    handleSetInputValue,
    handleAddTask,
    taskLabel,
    handleDeleteTask,
    handleTaskComplete,
    undoDeleteTask,
  };
};
