import style from "./TodoListItem.module.css";
import IconBin from "./assets/images/icon_bin.svg?react";

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

export default TodoListItem;
