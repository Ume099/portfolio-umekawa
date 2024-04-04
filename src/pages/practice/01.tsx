import { NextPage } from 'next';

import Button from '@/components/common/parts/Button';
import { useTodo } from '@/hooks/useTodo';

const Page: NextPage = () => {
  const {
    taskList,
    handleSetInputValue,
    handleAddTask,
    taskLabel,
    handleDeleteTask,
    handleTaskComplete,
    undoDeleteTask,
  } = useTodo();

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <div className="flex justify-center">
        <div className="text-center text-base">
          <div>
            <input
              onChange={(e) => handleSetInputValue(e)}
              value={taskLabel}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* 追加ボタン */}
          <div className="mt-4">
            <Button onClick={handleAddTask} label="追加" variant="primary" />
          </div>
          {/* タスクを表示 */}
          <div className="mt-8 rounded-md border p-4 text-center ">
            <h2>=============タスク=============</h2>
            <div className="mt-4">
              <ul>
                {taskList.map(
                  (todo, index) =>
                    todo.isDeleted || (
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
                            onClick={() => handleDeleteTask(index)}
                            label="削除"
                            variant="error-secondary"
                            className="mb-2"
                          />
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-b"></div>

          {/* 削除済みタスクを表示 */}
          <div className="mt-8 rounded-md border p-4 text-center ">
            <h2>==========削除されたタスク==========</h2>
            <div className="mt-4">
              <ul>
                {taskList.map(
                  (todo, index) =>
                    todo.isDeleted && (
                      <li key={index} className="mb-2 flex justify-between border-b">
                        <span className={todo.isCompleted ? 'line-through' : ''}>{todo.label}</span>
                        <div className="flex gap-x-2">
                          <Button
                            onClick={() => undoDeleteTask(index)}
                            label="Undo"
                            variant="error-secondary"
                            className="mb-2"
                          />
                        </div>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
