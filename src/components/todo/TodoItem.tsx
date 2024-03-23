import { useCallback } from "react"
import type { TodoItem as _TodoItem, StateArgs } from "./Todo"

const TodoItemComponent = ({
  state,
  updateState,
  title,
  completed,
  id
}: StateArgs & _TodoItem) => {

  const handleDelete = useCallback((event: React.FormEvent) => {
    event.preventDefault()

    const newState = state.filter((todo: _TodoItem) => todo.id !== id)
    updateState?.(newState)

  }, [id, state, updateState])

  const handleComplete = useCallback((event: React.FormEvent) => {
    const target = event.target as HTMLInputElement
    const isChecked = target.checked

    const idx = state.findIndex((todo: _TodoItem) => {
      return todo.id === id
    })
    const newState = [...state]
    newState[idx].completed = isChecked
    updateState?.(newState)

  }, [id, state, updateState])

  return (
    <>
      <li>
        <input type="text" value={title} />
        <label htmlFor="completedTodo">Completed</label>
        <input name="completedTodo" type="checkbox" checked={completed} onChange={handleComplete} />
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </li>
    </>
  )
}

export const TodoItem = TodoItemComponent