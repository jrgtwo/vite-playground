import { Dispatch } from "react"
import { Header } from './Header'
import { Footer } from './Footer'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { useState } from 'react'

export type StateArgs = {
  updateState?: Dispatch<TodoStore>,
  state: TodoStore
}
export type TodoItem = {
  title: string,
  completed: boolean
}
export type TodoStore = TodoItem[]
const todoStore: TodoStore = []

const TodoComponent = () => {

  const [todoState, setTodoState] = useState<TodoStore>(todoStore)

  return (
    <>
      <Header />
      <TodoInput state={todoState} updateState={setTodoState} />
      <TodoList state={todoState} />
      <Footer />
    </>
  )
}

export const Todo = TodoComponent

