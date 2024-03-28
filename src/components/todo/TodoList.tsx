import { useCallback, useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import type { StateArgs, TodoItem as _TodoItem } from './types'

const TodoListComponent = ({ model, setModel }: StateArgs) => {
  const [data, setData] = useState(model.getAll())

  const onChange = useCallback(() => {
    setData(model.getAll())
  }, [model, setData])

  useEffect(() => {
    model.onChange(onChange)
    return () => {
      model.off(onChange)
    }
  }, [model, onChange])

  const todos = data.map(({ title, completed, id }: _TodoItem) =>
    <TodoItem
      title={title}
      completed={completed}
      id={id}
      model={model}
      setModel={setModel}
      key={id} />
  )

  return (
    <>
      <h4>Your Current Todo's</h4>
      <ul className='todo-list'>
        {todos}
      </ul>
    </>
  )
}

export const TodoList = TodoListComponent