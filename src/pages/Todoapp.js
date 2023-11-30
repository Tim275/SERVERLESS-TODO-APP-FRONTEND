import { createContext, useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import Footer from "../components/Footer";
import { Authenticator } from '@aws-amplify/ui-react';
import { Hub } from "@aws-amplify/core";
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';

import '@aws-amplify/ui-react/styles.css';
import './Authenticator.css';

Amplify.configure(awsconfig);




export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();

const TodoApp = () => {



  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedText, setEditedText] = useState("");
  const [toggleEditMode, setToggleEditMode] = useState(true);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          // A user has signed in, and the user's information is in the data object
          const userId = data.signInUserSession.idToken.payload.sub;
          fetchingData(userId);
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    // getting data from the server
    fetchingData();
  }, []);



  // fetching data
  // fetching data
const fetchingData = async (userId) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/fetchTodos`);
    if (!res.ok) throw new Error("Something went wrong!");
    console.log(res);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  } catch (error) {
    setError(error.message);
  }
};

//Delete event
//Delete event
const handleDelete = async (id) => {
  console.log('Deleting task with id:', id);
  try {
    // delete data
    await deleteData(id);
    //set updated tasks
    setTasks(tasks.filter((task) => id !== task.id));
  } catch (error) {
    console.error(error.message);
  }
};

  //Editing Event
  const handleEdit = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);
    setTasks([...tasks]);
    setToggleEditMode(false);

    //Re-arrange
    tasks
      .filter((task) => task.id !== id)
      .map((targetedEl) => (targetedEl.isEditable = false));
  };

  const deleteData = async (id) => {
    console.log('Deleting task with id:', id);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  };

  //Editing task form handler
//Editing task form handler
const handleEditSubmitter = (e, id) => {
  e.preventDefault();
  setToggleEditMode(!toggleEditMode);

  //Persist data
  const editPersistance = {
    todo: editedText,
    completed: tasks.find(task => task.id === id).completed
  };

  //Puting request
  puttingRequest(id, editPersistance);

  //Real time update
  const [editableTarget] = tasks.filter((task) => id === task.id);
  editableTarget.isEditable = false;
  editableTarget.todo = editPersistance.todo;
  setTasks([...tasks]);
};
const puttingRequest = async (id, newData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/editTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};


return (
    <Authenticator>
      <div className='wraper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10'>
        <DeleteHandlerContext.Provider value={handleDelete}>
          <EditHandlerContext.Provider value={handleEdit}>
            <Header />
            <AddTask tasks={tasks} setTasks={setTasks} />
            <TaskList
              tasks={tasks}
              error={error}
              loading={loading}
              handleEditSubmitter={handleEditSubmitter}
              editedText={editedText}
              setEditedText={setEditedText}
            />
            <Footer />
          </EditHandlerContext.Provider>
        </DeleteHandlerContext.Provider>
      </div>
    </Authenticator>
  );
}

export default TodoApp;