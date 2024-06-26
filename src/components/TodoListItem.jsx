import style from "./TodoListItem.module.css";
import IconBin from "../assets/images/icon_bin.svg?react";
import PropTypes from "prop-types";

function TodoListItem({todo, onRemoveTodo}) {
  return (
    <li className={style.ListItem}>
      {todo.title}
      <button className={style.RemoveButton} type="button" onClick={() => {onRemoveTodo(todo.id)}}>
        <IconBin />
      </button>
    </li>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoListItem;
