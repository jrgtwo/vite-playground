const TodoItemComponent = () => {
  return (
    <>
      <li>
        <input type="text" value="your todo" />
        <label htmlFor="deleteTodo">Delete</label>
        <input name="deleteTodo" type="checkbox" />
        <button>Edit</button>
      </li>
    </>
  )
}

export const TodoItem = TodoItemComponent