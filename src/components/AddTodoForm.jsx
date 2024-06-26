import {useState} from "react";
import InputWithLabel from "./InputWithLabel.jsx";
import style from "./AddTodoForm.module.css";
import PropTypes from "prop-types";

function AddTodoForm({onAddTodo}) {

  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo({
      title: todoTitle
    });

    setTodoTitle('');
  };

  return (
    <form className={style.Form} onSubmit={handleAddTodo}>
      <InputWithLabel handleTitleChange={handleTitleChange} todoTitle={todoTitle}>
        <>Title</>
      </InputWithLabel>
      <button className={style.Button} type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired
}

export default AddTodoForm;
