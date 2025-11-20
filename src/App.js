import { useState } from "react";
import './App.css';

function App() {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const isOverdue = (task) => !task.completed && new Date(task.dueDate) < new Date();

  const addTask = () => {
    if (!taskName || !dueDate) return;

    if (editTaskId) {
      setTasks(
        tasks.map((t) =>
          t.id === editTaskId ? { ...t, name: taskName, dueDate: dueDate } : t
        )
      );
      setEditTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), name: taskName, dueDate, completed: false }]);
    }

    setTaskName("");
    setDueDate("");
  };

  const markCompleted = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <div className="tasks-box">
        <h3>Pending Tasks</h3>
        {tasks.filter(t => !t.completed).map((t) => (
          <div className={`task ${isOverdue(t) ? "warning-task" : ""}`} key={t.id}>
            <div className="task-info">
              <div className="task-title">{t.name}</div>
              <div className="task-meta">
                {new Date(t.dueDate).toLocaleString()}
                {isOverdue(t) && <div className="warning-label">Deadline Missed</div>}
              </div>
            </div>

            <div className="task-buttons">
              <button className="complete" onClick={() => markCompleted(t.id)}>Complete</button>
              <button className="edit" onClick={() => {
                setTaskName(t.name);
                setDueDate(t.dueDate);
                setEditTaskId(t.id);
              }}>Edit</button>
              <button className="delete" onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </div>
        ))}

        <h3>Completed Tasks</h3>
        {tasks.filter(t => t.completed).map(t => (
          <div className="task completed-task" key={t.id}>
            <div className="completed-label">Completed</div>
            <div className="task-info">
              <div className="task-title">{t.name}</div>
              <div className="task-meta">{new Date(t.dueDate).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
