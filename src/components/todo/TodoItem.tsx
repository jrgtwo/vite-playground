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

  return (
    <>
      <li>
        <input type="text" value={title} />
        <label htmlFor="completedTodo">Completed</label>
        <input name="completedTodo" type="checkbox" checked={completed} />
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </li>
    </>
  )
}

export const TodoItem = TodoItemComponent