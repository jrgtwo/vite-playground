import { Header } from './Header'
import { Footer } from './Footer'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { useState } from 'react'
import { TodoModel } from './TodoModel'
import './Todo.css'

const todoModel = new TodoModel()

const TodoComponent = () => {

  const [todoModelState, setTodoModelState] = useState<TodoModel>(todoModel)

  return (
    <>
      <Header />
      <TodoInput
        model={todoModelState}
        setModel={setTodoModelState} />
      <TodoList
        model={todoModelState}
        setModel={setTodoModelState} />
      <Footer />
    </>
  )
}

export const Todo = TodoComponent

