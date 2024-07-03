import { useState } from 'react'
import './App.css'

export default function App (){
  const [newItem, setNewItem] = useState("")
  return(
    <>
      <form className='new-item-form'>
        <div className="form-row">
          <label htmlFor='item'>New Item</label>
          <input type="text" id="item" />
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