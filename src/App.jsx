import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import {Fragment, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import style from "./App.module.css";
import SortButton from "./components/SortButton.jsx";

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState({
    column: 'title',
    direction: 'desc'
  });

  const sortLabels = [
    "title",
    "date",
  ];

  const fetchData = async () => {

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    let urlParams = `?view=Grid%20view&sort[0][field]=${currentSort.column}&sort[0][direction]=${currentSort.direction}`;
    if (currentSort.column === 'date') {
      urlParams = `?view=Grid%20view`;
    }

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}${urlParams}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let data = await response.json();

      // Sort with JavaScript (it was in the task, but it is no longer needed)
      // data.records.sort((objectA, objectB) => {
      //   if (objectA.fields.title < objectB.fields.title) {
      //     return 1;
      //   } else if (objectA.fields.title > objectB.fields.title) {
      //     return -1;
      //   } else {
      //     return 0;
      //   }
      // });

      if (currentSort.column === 'date' && currentSort.direction === 'desc') {
        data.records.reverse();
      }

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

      //setTodoList([...todoList, ...newTodo]);
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentSort]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    if (newTodo.title.trim() !== "") {
      //setTodoList([...todoList, newTodo]);

      storeData(newTodo).then(()=>{
        fetchData();
      });
    }
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todoItem) => {
      return todoItem.id !== id;
    }));
  };

  const onSort = (column, direction) => {
    setCurrentSort({
      column: column,
      direction: direction
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fragment>
          <h1 className={style.Title}>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo}/>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className={style.SortContainer}>
                {sortLabels.map((sortLabel) => {
                  return (<SortButton key={sortLabel} onSort={onSort} label={sortLabel}
                                      currentDirection={currentSort.column === sortLabel ? currentSort.direction : ''}/>);
                })}
              </div>
              <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            </>
          )}
        </Fragment>}/>
        <Route path="/new" element={<h1>New Todo List</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
