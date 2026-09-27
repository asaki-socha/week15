
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // タスクが変わったら保存する
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // タスクを追加する
  const addTask = () => {
    const text = input.trim();

    if (text === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: text,
        done: false,
      },
    ]);

    setInput("");
  };

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // タスクを削除する
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
    <h1>タスク管理アプリ</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />

      <button onClick={addTask}>
        追加
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => toggleTask(task.id)}>
              {task.done ? "☑" : "□"} {task.text}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

