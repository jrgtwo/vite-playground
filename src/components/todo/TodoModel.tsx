import {
  TodoItem,
  TodoModelInterface,
  TodoModelOnChangeCallback,
  ChangeEvent,
  TodoModelActions,
  SILENT
} from "./types"
import { LocalDataStore } from "./TodoLocalDataStore"

export class TodoModel implements TodoModelInterface {
  _map
  _onChangeCbList: Set<TodoModelOnChangeCallback>
  _storage?: LocalDataStore
  constructor() {
    this._map = new Map()
    this._onChangeCbList = new Set()
  }

  onChange(cb: TodoModelOnChangeCallback) {
    if (this._onChangeCbList.has(cb)) {
      return false
    }
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
    this.loadFromBackup(this._storage?.getLatest() || [])
  }

  off(cb: TodoModelOnChangeCallback) {
    this._onChangeCbList?.delete(cb)
    return this
  }

  add(data: TodoItem, silent?: SILENT) {

    if (this._map.has(data.id)) {
      const currState = this._map.get(data.id) || []
      this._map.set(data.id, [...currState, data])
    } else {
      this._map.set(data.id, [data])
    }

    if (silent !== SILENT.TRUE) {
      this._triggerOnChange({
        action: TodoModelActions.ADD
      })
    }

    return this
  }

  remove({ id }: Partial<TodoItem>) {
    if (!this._map.has(id)) return false
    this._map.delete(id)

    this._triggerOnChange({
      action: TodoModelActions.REMOVE
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

    this._map.forEach((item: TodoItem) => {
      allItems.push(item)
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
      action: TodoModelActions.UPDATE
    })

    return this
  }

  loadFromBackup(backup: TodoItem[][]) {
    if (!backup) return undefined
    //new Map(Object.fromEntries(this._map.entries()))
    this._map = new Map()
    backup.forEach((itemArr: TodoItem[]) => {
      itemArr.forEach((item) => {
        this.add(item, SILENT.TRUE)
      })

    })
    return this
  }

  setInternalStorage(localStorage: LocalDataStore) {
    this._storage = localStorage
    this.loadFromBackup(this._storage.getLatest() || [])
  }
}