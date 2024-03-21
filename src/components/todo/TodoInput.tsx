const TodoInputComponent = () => {
  return (
    <>
      <h2>Add a new Todo:</h2>
      <form>
        <label htmlFor="todo">Name your todo:</label>
        <input name="todo" type="text"></input>
        <input type="submit" />
      </form>
    </>
  )
}

export const TodoInput = TodoInputComponent