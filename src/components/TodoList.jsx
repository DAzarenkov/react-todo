import TodoListItem from "./TodoListItem.jsx";
import PropTypes from "prop-types";

function TodoList({todoList, onRemoveTodo}) {
  return (
    <ul>
      {todoList.map(function (listItem) {
        return <TodoListItem key={listItem.id} todo={listItem} onRemoveTodo={onRemoveTodo}/>
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoList
