import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })
  const [completedTodos, setCompletedTodos] = useState(() => {
    const localValue = localStorage.getItem("COMPLETEDITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("COMPLETEDITEMS", JSON.stringify(completedTodos))
  }, [completedTodos])

  function handleSubmit(e){
    e.preventDefault()
    if (isEditing){
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

  function editTodo(todo){
    setIsEditing(true)
    setCurrentTodo(todo)
    setNewItem(todo.title)
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      const todo = currentTodos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = completed
        if (completed) {
          setCompletedTodos([...completedTodos, todo])
          return currentTodos.filter(todo => todo.id !== id)
        }
      }
      return currentTodos
    })

    setCompletedTodos(currentCompletedTodos => {
      const todo = currentCompletedTodos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = completed
        if (!completed) {
          setTodos([...todos, todo])
          return currentCompletedTodos.filter(todo => todo.id !== id)
        }
      }
      return currentCompletedTodos
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
    setCompletedTodos(currentCompletedTodos => currentCompletedTodos.filter(todo => todo.id !== id))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className="form-row">
          <label htmlFor='item'>{isEditing ? 'Edit Item' : 'New Item'}</label>
          <input value={newItem}
            placeholder='Enter a new To-do'
            type="text"
            id="item"
            onChange={e => setNewItem(e.target.value)} />
        </div>
        <button className='btn'>{isEditing ? 'Update Task' : 'Add task'}</button>
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
      <h1 className='header'>Already Completed</h1>
      <ul className='list'>
        {completedTodos.length === 0 && "No completed Todos"}
        {completedTodos.map(todo => {
          return (
            <li key={todo.id} >
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
