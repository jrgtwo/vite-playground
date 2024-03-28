import type { ChangeEvent, TodoItem, LocalDataStoreAgentInterface } from "./types"
import { TodoModel } from './TodoModel'
import { TODOS } from './types'


export class LocalDataStore implements LocalDataStoreAgentInterface {
  _model
  constructor(model: TodoModel) {
    this._model = model
    this.init()
  }

  init() {
    this._model.onChange(this._onChange.bind(this))
  }
  _onChange(event: ChangeEvent) {
    console.debug(event)
    const curr = this._model.getAll()
    localStorage.setItem(TODOS, JSON.stringify(curr))
  }

  getLatest() {
    const payload: TodoItem[][] = JSON.parse(`${localStorage.getItem(TODOS)}`) || undefined
    return payload
  }
}