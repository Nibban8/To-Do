import { useState, useEffect } from "react";


import Pen from "./icons/Pen";
import Trash from "./icons/Trash";
import Disk from "./icons/Disk";

import {Button , Input} from 'reactstrap'

function App() {

  const [tasks, setTasks] = useState([]);
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
        <h2>To Do List</h2>
        <div className="todo-add mb-4">
          <Input
          placeholder="Escribe una tarea"
            onFocus={() => { setNuTask(""); setSelected(-1) ; setEditing(false)}}
            value={editing ? "" : nuTask}
            onChange={(e) => setNuTask(e.target.value)}
            type="text"
          />
          <Button color="primary" onClick={handleAdd}>Agregar</Button>
        </div>

        {tasks.map((task, index) => (
          <div className="todo-list" key={index}>
            {editing && index === selected ? (
              <div className="todo-edit">
                <Input
                  type="text"
                  value={nuTask}
                  onChange={(e) => setNuTask(e.target.value)}
                />
                <Button className="p-1 mx-1" outline={true} color="secondary"  onClick={() => handleSave(index)}>
                  <Disk />
                </Button>
              </div>
            ) : (
              <div className="todo-items">
               <div className="bullet">•</div> <span>{task}</span>
                <Button className="p-1 mx-1" outline={true} color="secondary" onClick={() => handleEdit(task ,index)}>
                  <Pen />
                </Button>
                <Button  className="p-1 mx-1"outline={true} color="secondary"  onClick={() => handleDelete(index)}>
                  <Trash />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
