import { useState } from 'react'
import './App.css'

export default function App (){
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e){
    e.preventDefault()

    setTodos((currentTodos) => {
      return[
        ...currentTodos, { id: crypto.randomUUID(), title: "New Item", completed: false },
      ]
    }
      

  }
  
  return(
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className="form-row">
          <label htmlFor='item'>New Item</label>
          <input value={newItem}
            type="text"
            id="item"
            onChange={e => setNewItem(e.target.value)} />
        </div>
        <button className='btn'>Add Task</button>
      </form>
      <h1 className='header'>To-Do List</h1>
      <ul className='list'>
        <li>
          <label>
            <input type="checkbox" name="" id="" />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" name="" id="" />
            Item 2
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" name="" id="" />
            Item 3
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul>
    </>
  )
}