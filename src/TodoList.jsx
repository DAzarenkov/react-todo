import TodoListItem from "./TodoListItem.jsx";

function TodoList({todoList, onRemoveTodo}) {
  return (
    <ul>
      {todoList.map(function (listItem) {
        return <TodoListItem key={listItem.id} todo={listItem} onRemoveTodo={onRemoveTodo}/>
      })}
    </ul>
  )
}

export default TodoList
