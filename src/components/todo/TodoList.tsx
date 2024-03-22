import { TodoItem } from './TodoItem'
import type { StateArgs, TodoItem as _TodoItem } from './Todo'

const TodoListComponent = ({ state, updateState }: StateArgs) => {
  const todos = state.map(({ title, completed, id }: _TodoItem) =>
    <TodoItem
      title={title}
      completed={completed}
      id={id}
      state={state}
      updateState={updateState} />
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