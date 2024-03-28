import type {
  TodoItem,
  TodoModelInterface,
  TodoModelOnChangeCallback,
  ChangeEvent
} from "./types"

export class TodoModel implements TodoModelInterface {
  _map
  _onChangeCbList: Set<TodoModelOnChangeCallback>
  constructor() {
    this._map = new Map()
    this._onChangeCbList = new Set()
  }

  onChange(cb: TodoModelOnChangeCallback) {
    this._onChangeCbList.add(cb)
    return this
  }

  _triggerOnChange(event: ChangeEvent) {
    this._onChangeCbList.forEach((cb) => {
      try {
        cb(event)
      } catch (err) {
        console.error('There was an error', err)
      }
    })
  }

  off(cb: TodoModelOnChangeCallback) {
    this._onChangeCbList?.delete(cb)
    return this
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