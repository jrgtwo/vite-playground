import type { TodoItem as _TodoItem } from "./Todo"

const TodoItemComponent = ({ title, completed }: _TodoItem) => {
  return (
    <>
      <li>
        <input type="text" value={title} />
        <label htmlFor="completedTodo">Completed</label>
        <input name="completedTodo" type="checkbox" checked={completed} />
        <button>Edit</button>
      </li>
    </>
  )
}

export const TodoItem = TodoItemComponent