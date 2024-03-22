import { TodoItem } from './TodoItem'
import type { StateArgs, TodoItem as _TodoItem } from './Todo'

const TodoListComponent = ({ state }: StateArgs) => {
  const todos = state.map(({ title, completed }: _TodoItem) =>
    <TodoItem title={title} completed={completed} />
  )

  return (
    <>
      <h4>Your Current Todo's</h4>
      <ul>
        {todos}
      </ul>
    </>
  )
}

export const TodoList = TodoListComponent