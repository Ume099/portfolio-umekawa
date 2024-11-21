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
  handleDeleteTask: (index: number) => void;
  handleUpdateTask: (id: number) => void;
};

const fetcher = (url: string) =>
  axios.get(url).then((res: { data: Task[] }) => {
    console.log(res.data);
    return res.data;
  });

export const useTodo: UseTodo = () => {
  const [taskLabel, setTaskLabel] = useState('');
  const { data: taskList, mutate } = useSWR<Task[]>('/api/fetchTasks?collectionName=data', fetcher);

  const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleAddTask = async () => {
    if (!taskLabel.trim()) {
      toast.warn('ラベルを入力して下さい');
      return;
    }
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
    }
  };

  const handleDeleteTask = async (id: number) => {
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
    }
  };

  const handleUpdateTask = async () => {
    const data: Task = { id: Date.now(), completed: false, label: 'test', isDeleted: false };
    try {
      const res = await axios.post('/api/updateTask', data);
      toast.info('タスクを追加しました');
    } catch (e) {
      console.log(e);
    } finally {
      await mutate();
    }
  };

  return {
    handleSetInputValue,
    taskLabel,
    taskList,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  };
};
