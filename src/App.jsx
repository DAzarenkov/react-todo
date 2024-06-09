import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {Fragment, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import style from "./App.module.css";

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let data = await response.json();
      let todos = data.records.map((todo) => {
        return {
          title: todo.fields.title,
          id: todo.id
        };
      });

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message)
    }
  };

  const storeData = async (data) => {

    let body = {
      records: [
        {
          fields: {
            title: data.title
          }
        }
      ]
    };

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let data = await response.json();
      let newTodo = data.records.map((todo) => {
        return {
          title: todo.fields.title,
          id: todo.id
        };
      });

      setTodoList([...todoList, ...newTodo]);
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    //setTodoList([...todoList, newTodo]);

    storeData(newTodo);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todoItem) => {
      return todoItem.id !== id;
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fragment>
          <h1 className={style.Title}>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo}/>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
          )}
        </Fragment>}/>
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
