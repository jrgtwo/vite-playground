import { Dispatch } from 'react'
import { TodoModel } from './TodoModel'
import { LocalDataStore } from './TodoLocalDataStore'

export const TODOS = 'TODOS'

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
export enum TodoModelActions {
  'ADD' = 'add',
  'REMOVE' = 'remove',
  'UPDATE' = 'update'
}
export type ChangeEvent = {
  action: string
}

export type TodoModelOnChangeCallback = (event: ChangeEvent) => void
export type TodoModelSet = Set<TodoModelOnChangeCallback> | undefined

export interface TodoModelInterface {
  _map: TodoModelMap
  _onChangeCbList: Set<TodoModelOnChangeCallback>,
  _storage?: LocalDataStore | undefined
  off: (cb: TodoModelOnChangeCallback) => this,

  add: (data: TodoItem, silent?: SILENT) => this,
  remove: ({ id }: Partial<TodoItem>) => this | false,
  get: ({ id }: Partial<TodoItem>) => TodoItem[] | false | undefined,
  getAll: () => TodoItem[]
  update: (data: TodoItem) => this
  onChange: (cb: TodoModelOnChangeCallback) => this | false

  loadFromBackup: (backup: TodoItem[][]) => this | undefined
  setInternalStorage: (storage: LocalDataStore) => void
}

export interface LocalDataStoreAgentInterface {
  _model: TodoModel
  init: () => void
  _onChange: (event: ChangeEvent) => void
  getLatest: () => TodoItem[][]
}

export enum SILENT {
  TRUE,
  FALSE
}