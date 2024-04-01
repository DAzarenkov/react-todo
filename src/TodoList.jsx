import TodoListItem from "./TodoListItem.jsx";

function TodoList({todoList}) {
  return (
    <ul>
      {todoList.map(function (listItem) {
        return <TodoListItem key={listItem.id} todo={listItem}/>
      })}
    </ul>
  )
}

export default TodoList
