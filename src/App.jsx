import { useState } from 'react'
import './App.css'

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Buy groceries" },
  { id: 3, title: "Go to the gym" },
  { id: 4, title: "Read a book" },
  { id: 5, title: "Plan weekend activities" }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Todo List</h1>
      <u>
        {todoList.map(function (listItem) {
          return <li key={listItem.ids}>{listItem.title}</li>
        })}
      </u>
    </>
  )
}

export default App
