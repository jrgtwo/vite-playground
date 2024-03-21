import { Header } from './Header'
import { Footer } from './Footer'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

const TodoComponent = () => {
  return (
    <>
      <Header />
      <TodoInput />
      <TodoList />
      <Footer />
    </>
  )
}

export const Todo = TodoComponent

