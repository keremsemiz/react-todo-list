import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (isEditing) {
      setTodos(currentTodos => currentTodos.map(todo => todo.id === currentTodo.id ? { ...todo, title: newItem } : todo))
      setIsEditing(false)
      setCurrentTodo(null)
    } else {
      setTodos(currentTodos => [
        ...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false },
      ])
    }
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function editTodo(todo) {
    setIsEditing(true)
    setCurrentTodo(todo)
    setNewItem(todo.title)
  }

  return (
    <>
      <div className="navbar">
        <h1 className="navbar-title">Current Time: {time}</h1>
      </div>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className="form-row">
          <label htmlFor='item'>{isEditing ? 'Edit Item' : 'New Item'}</label>
          <input value={newItem}
            placeholder='Enter a new To-do'
            type="text"
            id="item"
            onChange={e => setNewItem(e.target.value)} />
        </div>
        <button className='btn'>{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>
      <h1 className='header'>To-Do List</h1>
      <ul className='list'>
        {todos.length === 0 && "No current To-Dos"}
        {todos.map(todo => {
          return (
            <li key={todo.id} >
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button onClick={() => editTodo(todo)} className="btn btn-safety">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
