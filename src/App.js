import { useState } from "react";
import './App.css';

function App() {
  const [taskName, setTaskName] = useState("");          // Add task input
  const [dueDate, setDueDate] = useState("");            // Add task input
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");  // Edit modal input
  const [editDueDate, setEditDueDate] = useState("");    // Edit modal input

  const isOverdue = (task) => !task.completed && new Date(task.dueDate) < new Date();

  const addTask = () => {
    if (!taskName || !dueDate) return;

    setTasks([...tasks, { id: Date.now(), name: taskName, dueDate, completed: false }]);
    setTaskName("");
    setDueDate("");
  };

  const markCompleted = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const updateTask = () => {
    setTasks(tasks.map(t =>
      t.id === editTaskId ? { ...t, name: editTaskName, dueDate: editDueDate } : t
    ));
    setEditTaskId(null);
    setEditTaskName("");
    setEditDueDate("");
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>

      {/* Add Task Inputs */}
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

      {/* Tasks List */}
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
                setEditTaskId(t.id);
                setEditTaskName(t.name);
                setEditDueDate(t.dueDate);
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

      {/* Modal Edit Box */}
      {editTaskId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              placeholder="Task Name"
            />
            <input
              type="datetime-local"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={updateTask}>Update</button>
              <button onClick={() => setEditTaskId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
