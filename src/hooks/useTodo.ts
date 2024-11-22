import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { Task } from '@/lib/types/tasks';

type UseTodo = () => {
  handleSetInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  taskLabel: string;
  taskList: Task[] | undefined;
  handleAddTask: () => void;
  isAddButtonLoading: boolean;
  handleDeleteTask: (index: number) => void;
  isDeleteButtonLoading: number;
  handleUpdateTask: (id: number, completed: boolean) => void;
  isCompleteButtonLoading: number;
  error: Error | undefined;
};

const fetcher = (url: string) =>
  axios.get(url).then((res: { data: Task[] }) => {
    console.log(res.data);
    return res.data;
  });

export const useTodo: UseTodo = () => {
  const [taskLabel, setTaskLabel] = useState('');
  const [isAddButtonLoading, setIsAddButtonLoading] = useState(false);
  const [isCompleteButtonLoading, setIsCompleteButtonLoading] = useState(0);
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(0);
  const {
    data: taskList,
    mutate,
    error,
  } = useSWR<Task[], Error | undefined>('/api/fetchTasks?collectionName=data', fetcher);

  const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleAddTask = async () => {
    if (!taskLabel.trim()) {
      toast.warn('ラベルを入力して下さい');
      return;
    }
    setIsAddButtonLoading(true);
    const data: Task = { id: Date.now(), completed: false, label: taskLabel, isDeleted: false };
    try {
      const res = await axios.post('/api/addTask', data);
      toast.info('タスクを追加しました');
    } catch (e) {
      toast.error(
        `タスクの追加に失敗しました。${e instanceof Error && e.message} ${e instanceof FirebaseError && 'エラーコード' + e.code}`,
      );
    } finally {
      setTaskLabel('');
      await mutate();
      setIsAddButtonLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setIsDeleteButtonLoading(id);
    try {
      const res = await axios.delete<{ fieldName: number }>('/api/deleteTask', {
        data: { fieldValue: id },
      });
      console.log(res);
      toast.info('タスクを削除しました');
    } catch (e) {
      console.log(e);
    } finally {
      await mutate();

      setIsDeleteButtonLoading(0);
    }
  };

  const handleCompleteTask = async (id: number, completed: boolean) => {
    setIsCompleteButtonLoading(id);
    try {
      console.log(completed);
      if (completed) {
        const res = await axios.post('/api/updateTask', { id, completed: false });
      } else {
        const res = await axios.post('/api/updateTask', { id, completed: true });
      }
      toast.info(`${completed ? 'タスクを完了にしました' : 'タスクを未完了にしました。'}`);
    } catch (e) {
      console.log(e);
    } finally {
      await mutate();

      setIsCompleteButtonLoading(0);
    }
  };

  return {
    handleSetInputValue,
    taskLabel,
    taskList,
    handleAddTask,
    isAddButtonLoading,
    handleDeleteTask,
    isDeleteButtonLoading,
    handleUpdateTask: handleCompleteTask,
    isCompleteButtonLoading,
    error,
  };
};
