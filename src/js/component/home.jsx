import React, { useState, useEffect } from "react";

//create your first component
// Arrow function

const Home = () => {


  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");


// que diferencias hay entre este fetch y el de clase
// y por que utilizar el async function



  async function getTasks() {

    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`
      );
      const data = await response.json();
      console.log(data);
      const previousTasks = data.todos.map((task) => ({
        id: task.id,
        label: task.label,
      }));

      setTasks(previousTasks);
    } catch (e) {
      console.log(e);
    }
  }



  async function deleteTasks(id) {

    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("deleted succesfully");
    } else {
      alert("Task has not been deleted");
    }
  }




  async function pushTasks() {
    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${userName}`,
      {
        method: "POST",
        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const postData = await response.json();
      getTasks();
      console.log(postData);
    } else {
      alert("Task not sent to server, Create User first");
      window.location.reload();
    }
  }




  async function deleteUser(userName) {
    const response = await fetch(
      `https://playground.4geeks.com/todo/users/${userName}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          user_name: userName,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      alert("User has not been deleted");
    }
  }


  // funcion de handleuser

  const handleUserCreation = () => {
    const name = prompt("Plese enter a User Name");
    if (name) {
      setUserName(name);
      createUser(name);
    }
  };

  //async de nuevo 

  async function createUser(name) {
    const response = await fetch(
      `https://playground.4geeks.com/todo/users/${name}`,
      {
        method: "POST",
        body: JSON.stringify({
          user_name: name,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      alert("User created succesfully, write some ToDos!");
      const postData = await response.json();
      console.log(postData);
    } else {
      alert("User has not been created");
    }
  }

  function addTask() {
    if (inputValue == "") {
      alert("The task field is empty!");
    }

    if (inputValue !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
      pushTasks();
    }
  }

  function removeTask(id) {
    setTasks(tasks.filter((task, index) => task.id !== id));
    deleteTasks(id);
  }

  function tasksLeft() {
    const tasksToDo = tasks.length;
    if (tasksToDo === 0) {
      return "No tienes nada que hacer?";
    }
    if (tasksToDo === 1) {
      return "Sólo tienes " + tasksToDo + " tarea pendiente!";
    }
    if (tasksToDo > 0) {
      return "Sólo tienes " + tasksToDo + " tareas pendientes!";
    }
  }

  //useEFECT function

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="mt-5 ">
        <h1 className=" display-1 ">LISTA DE TAREAS</h1>
        <div>Tareas de:{userName && <p>{userName}</p>}</div>
        <div className="containter d-flex ">
          <input
            className="form-control"
            id="input"
            placeholder="Añadir tareas +"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          ></input>
        </div>
        <ul className="list-group mt-2">
          {tasks.map((task, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center "
              key={index}
            >
              {task.label}
              <button
                type="sm-button"
                className="removeButton btn btn-ligth btn-sm"
                onClick={() => removeTask(task.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="text-start mt-2">
          <p className="ms-3 text-muted">{tasksLeft()}</p>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="cleanButton btn-sm  btn-success mt-2 "
            onClick={() => deleteUser(userName)}
          >
            Eliminar tareas
          </button>
          <button
            type="button"
            className="createUserButton btn-sm  btn-success mt-2 "
            onClick={handleUserCreation}
          >
            Crear Usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;