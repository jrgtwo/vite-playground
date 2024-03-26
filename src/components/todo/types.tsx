import { Dispatch } from "react"
import { TodoModel } from "./TodoModel"

export type StateArgs = {
  model: TodoModel,
  setModel: Dispatch<TodoModel>
}
export type TodoItem = {
  title: string,
  completed: boolean,
  id: number
}

export type TodoModelMap = Map<number | undefined, TodoItem[]>