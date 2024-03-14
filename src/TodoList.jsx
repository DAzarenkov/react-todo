const todoList = [
  {id: 1, title: "Complete assignment"},
  {id: 2, title: "Buy groceries"},
  {id: 3, title: "Go to the gym"},
  {id: 4, title: "Read a book"},
  {id: 5, title: "Plan weekend activities"}
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (listItem) {
        return <li key={listItem.id}>{listItem.title}</li>
      })}
    </ul>
  )
}

export default TodoList
