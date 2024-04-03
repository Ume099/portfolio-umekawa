import { ChangeEvent, useState } from 'react';

type Task = {
  label: string;
  isCompleted: boolean;
};

export const useTodo = () => {
  const [taskLabel, setTaskLabel] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleAddTask = () => {
    if (!taskLabel.trim()) {
      return;
    }
    setTaskList((prevState) => [...prevState, { label: taskLabel, isCompleted: false }]);
    setTaskLabel('');
  };

  const deleteTask = (index: number) => {
    setTaskList((prevState) => prevState.filter((_, subIndex) => subIndex !== index));
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
    deleteTask,
    handleTaskComplete,
  };
};
