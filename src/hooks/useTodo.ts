import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { Task } from '@/lib/types/tasks';

type UseTodo = () => {
  handleSetInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  taskLabel: string;
  taskList: Task[] | undefined;
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
  const { data: taskList } = useSWR<Task[]>('/api/fetchTasks?collectionName=data', fetcher);

  const handleSetInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskLabel(e.target.value);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await axios.delete<{ fieldName: number }>('/api/deleteTask', {
        data: { fieldValue: id },
      });
      console.log(res);
      toast.info('削除しました。');
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTask = async (id: number) => {
    try {
      const res = await axios.post('/api/updateTask', {
        id,
        fieldName: 'completed',
        fieldValue: true,
      });
      toast.info('一つのタスクを完了しました！');
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleSetInputValue,
    taskLabel,
    taskList,
    handleDeleteTask,
    handleUpdateTask,
  };
};
