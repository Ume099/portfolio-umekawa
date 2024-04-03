import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

import Button from '@/components/common/parts/Button';

type Task = {
  label: string;
  isCompleted: boolean;
};

const Page: NextPage = () => {
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

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <div className="flex justify-center">
        <div className="text-center text-base">
          <div>
            <input
              onChange={handleSetInputValue}
              value={taskLabel}
              className="rounded-md border px-3 py-2"
            />
          </div>
          {/* 追加ボタン */}
          <div className="mt-4">
            <Button onClick={handleAddTask} label="追加" variant="primary" />
          </div>
          {/* タスクを表示 */}
          <div className="mt-8 rounded-md border p-4 text-center ">
            <h2>==========TODOリスト==========</h2>
            <div className="mt-4">
              <ul>
                {taskList.map((todo, index) => (
                  <li key={index} className="mb-2 flex justify-between border-b">
                    <span className={todo.isCompleted ? 'line-through' : ''}>{todo.label}</span>
                    <div className="flex gap-x-2">
                      <Button
                        onClick={() => handleTaskComplete(index)}
                        label="完了"
                        variant="primary"
                        className="mb-2"
                      />
                      <Button
                        onClick={() => deleteTask(index)}
                        label="削除"
                        variant="error-secondary"
                        className="mb-2"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
