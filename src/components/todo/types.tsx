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
export type ChangeEvent = {
  action: string
}

export type TodoModelOnChangeCallback = (event: ChangeEvent) => void
export type TodoModelSet = Set<TodoModelOnChangeCallback> | undefined

export interface TodoModelInterface {
  _map: TodoModelMap
  _onChangeCbList: Set<TodoModelOnChangeCallback>,

  off: (cb: TodoModelOnChangeCallback) => this,

  add: (data: TodoItem) => this,
  remove: ({ id }: Partial<TodoItem>) => this | false,
  get: ({ id }: Partial<TodoItem>) => TodoItem[] | false | undefined,
  getAll: () => TodoItem[]
  update: (data: TodoItem) => this
  onChange: (cb: TodoModelOnChangeCallback) => this
}