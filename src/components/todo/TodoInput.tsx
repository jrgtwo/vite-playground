import { useCallback } from "react"
import type { StateArgs } from "./Todo"

const TodoInputComponent = ({ state, updateState }: StateArgs) => {

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const todoInput = event.currentTarget.todo
    const title = todoInput.value

    if (title.length === 0) return

    const newTodoItem = {
      title: title,
      completed: false,
      id: state[state.length - 1]?.id + 1 || 0
    }
    const newState = [...state, newTodoItem]
    updateState?.(newState)

    todoInput.value = ''

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