import { useCallback } from "react"
import type { StateArgs } from "./types"

const TodoInputComponent = ({ model, setModel }: StateArgs) => {

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const todoInput = event.currentTarget.todo
    const title = todoInput.value

    if (title.length === 0) return

    const newTodoItem = {
      title: title,
      completed: false,
      id: Date.now()
    }

    model.add(newTodoItem)
    setModel(model)

    todoInput.value = ''

  }, [model, setModel]);

  return (
    <>
      <h2>Add a new Todo:</h2>
      <form onSubmit={handleSubmit}>
        <input name="todo" type="text"></input>
        <input type="submit" />
      </form>
    </>
  )
}

export const TodoInput = TodoInputComponent