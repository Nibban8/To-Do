import { useState, useEffect } from "react";

import Pen from "./icons/Pen";
import Trash from "./icons/Trash";
import Disk from "./icons/Disk";

function App() {
  const tk = ["Task 1", "Task 2"];

  const [tasks, setTasks] = useState(tk);
  const [nuTask, setNuTask] = useState("");
  const [selected, setSelected] = useState(-1);
  const [editing, setEditing] = useState(false);

  const handleAdd = () => {
    setTasks([...tasks, nuTask]);
  };
  const handleEdit = (task , index) => {
    setNuTask(task);
    setSelected(index);
    setEditing(true);
  };
  const handleDelete = (index) => {
    let temp = [...tasks];
    temp.splice(index, 1);
    setTasks(temp);
  };

  const handleSave = (index) => {

    console.log(nuTask);

    let temp = [...tasks];
    temp[index] = nuTask;
    setTasks(temp);
    setEditing(false);
  }
  
  useEffect(() => {
    setNuTask("");
    setSelected(-1);
  }, [tasks]);

  return (
    <div className="App">
      <h1>LKMX - Front-End</h1>

      <div className="todo-card">
        <h3>To Do List</h3>
        <div>
          <input
            onFocus={() => {setSelected(-1) ; setEditing(false)}}
            value={editing ? "" : nuTask}
            onChange={(e) => setNuTask(e.target.value)}
            type="text"
          />
          <button onClick={handleAdd}>Agregar</button>
        </div>

        {tasks.map((task, index) => (
          <div key={index}>
            {editing && index === selected ? (
              <>
                <input
                  type="text"
                  value={nuTask}
                  onChange={(e) => setNuTask(e.target.value)}
                />
                <button onClick={() => handleSave(index)}>
                  <Disk />
                </button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button onClick={() => handleEdit(task ,index)}>
                  <Pen />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <Trash />
                </button>
              </>
            )}
          </div>
        ))}

        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
