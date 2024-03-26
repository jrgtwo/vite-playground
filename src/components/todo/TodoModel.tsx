import { TodoItem, TodoModelMap } from "./types"

export type ChangeEvent = {
  action: string
}

type TodoModelOnChangeCallback = (event: ChangeEvent) => void

export interface TodoModelInterface {
  _map: TodoModelMap
  _changeCbList: TodoModelOnChangeCallback[],
  add: (data: TodoItem) => this,
  remove: ({ id }: Partial<TodoItem>) => this | false,
  get: ({ id }: Partial<TodoItem>) => TodoItem[] | false | undefined,
  getAll: () => TodoItem[]
  update: (data: TodoItem) => this
  onChange: (cb: TodoModelOnChangeCallback) => this
}



export class TodoModel implements TodoModelInterface {
  _map
  _changeCbList: TodoModelOnChangeCallback[]
  constructor() {
    this._map = new Map()
    this._changeCbList = []
  }

  onChange(cb: TodoModelOnChangeCallback) {

    this._changeCbList.push(cb)

    return this
  }

  _triggerOnChange(event: ChangeEvent) {
    this._changeCbList.forEach((cb) => {
      cb(event)
    })
  }

  add(data: TodoItem) {
    if (this._map.has(data.id)) {
      const currState = this._map.get(data.id) || []
      this._map.set(data.id, [...currState, data])
    } else {
      this._map.set(data.id, [data])
    }

    this._triggerOnChange({
      action: 'add'
    })

    return this
  }

  remove({ id }: Partial<TodoItem>) {
    if (!this._map.has(id)) return false
    this._map.delete(id)

    this._triggerOnChange({
      action: 'remove'
    })

    return this
  }

  get({ id }: Partial<TodoItem>) {
    if (this._map.has(id)) {
      return this._map.get(id)
    } else {
      return false
    }
  }
  getAll() {
    if (this._map.size === 0) return []
    const allItems: TodoItem[] = []
    this._map.forEach((itemArr: TodoItem[]) => {
      itemArr.forEach((item) => {
        allItems.push(item)
      })
    })

    return allItems
  }

  update(data: TodoItem) {
    const { id } = data
    if (this._map.has(id)) {
      this._map.set(id, [data])
    } else {
      this.add(data)
    }

    this._triggerOnChange({
      action: 'update'
    })

    return this
  }

}