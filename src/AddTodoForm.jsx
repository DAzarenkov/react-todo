function AddTodoForm () {
  return (
    <form>
      <label htmlFor="todoTitle">Title</label>
      <input type="text" id="todoTitle"/>
      <button type="button">Add</button>
    </form>
  );
}

export default AddTodoForm;
