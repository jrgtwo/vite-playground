import { useCallback } from "react"
import type { TodoItem as _TodoItem, StateArgs } from "./types"

const TodoItemComponent = ({
  model,
  setModel,
  title,
  completed,
  id
}: StateArgs & _TodoItem) => {

  const handleDelete = useCallback((event: React.FormEvent) => {
    event.preventDefault()

    model.remove({ id })
    setModel(model)

  }, [id, model, setModel])

  const handleComplete = useCallback((event: React.FormEvent) => {
    const target = event.target as HTMLInputElement
    const isChecked = target.checked

    model.update({ id, completed: isChecked, title })
    setModel(model)

  }, [id, title, model, setModel])

  return (
    <>
      <li>
        <p>{title}</p>
        <label htmlFor="completedTodo">Completed</label>
        <input name="completedTodo" type="checkbox" checked={completed} onChange={handleComplete} />
        <button onClick={handleDelete}>Delete</button>
      </li>
    </>
  )
}

export const TodoItem = TodoItemComponent