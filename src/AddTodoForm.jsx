import {useState} from "react";
import InputWithLabel from "./InputWithLabel.jsx";

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
    <form onSubmit={handleAddTodo}>
      <InputWithLabel handleTitleChange={handleTitleChange} todoTitle={todoTitle}>
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
