import { useCallback } from "react"
import { StateArgs } from "./Todo"

const TodoInputComponent = ({ state, updateState }: StateArgs) => {

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = event.currentTarget.todo.value
    if (title.length === 0) {
      return
    }

    const arr = [...state, {
      title: title,
      completed: false
    }]
    updateState?.(arr)

  }, [state, updateState]);

  return (
    <>
      <h2>Add a new Todo:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Name your todo:</label>
        <input name="todo" type="text"></input>
        <input type="submit" />
      </form>
    </>
  )
}

export const TodoInput = TodoInputComponent