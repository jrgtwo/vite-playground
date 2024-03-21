import { TodoItem } from './TodoItem'

const TodoListComponent = () => {
  return (
    <>
      <h4>Your Current Todo's</h4>
      <ul>
        <TodoItem />
      </ul>
    </>
  )
}

export const TodoList = TodoListComponent