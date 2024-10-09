import React, { useState, useEffect } from 'react'
import ChecklistItem from './ChecklistItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const MainContent = () => {
  let toDoList = []

  const [checked, setChecked] = useState(toDoList)
  const [inputValue, setInputValue] = useState('')
  const [updatedValue, setUpdateValue] = useState('')
  const [isEditClicked, setIsEditClicked] = useState(false)
  const [editInputValue, setEditInputValue] = useState('')
  const [editItemId, setEditItemId] = useState(null)
  const apiUrl =
    import.meta.env.VITE_API_URL || 'https://todolistbackend-fb6e.onrender.com'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/todos`)
      const data = await response.json()
      setChecked(data.todos)
    }
    fetchData()
  }, [])

  const handleUserClick = async (e) => {
    let editItem = [...checked].find((item) => item._id === e.target.id)
    editItem = !editItem.completed
    const response = await fetch(`${apiUrl}/edit-todo/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: editItem.text,
        completed: editItem.completed,
      }),
    })
    const updatedTodo = await response.json()
    const tempArray = [...checked].map((item) =>
      item._id == id ? updatedTodo : item
    )
    setChecked(tempArray)
    console.log(checked)
  }
  const handleAddItem = async () => {
    const newItem = {
      text: inputValue,
    }
    const response = await fetch(`${apiUrl}/add-todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    if (!response.ok) {
      console.error('Item Failed to Add')
    }
    setChecked([...checked, newItem])
    setInputValue('')
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleEdit = async (id) => {
    let editItem = [...checked].find((item) => item._id === id)
    editItem.text = editInputValue
    const response = await fetch(`${apiUrl}/edit-todo/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: editInputValue,
        completed: editItem.completed,
      }),
    })
    const updatedTodo = await response.json()
    const tempArray = [...checked].map((item) =>
      item._id == id ? updatedTodo : item
    )
    setChecked(tempArray)
    setIsEditClicked(false)
  }

  const handleDelete = async (id) => {
    const updatedItems = checked.filter((item) => {
      if (item._id !== id) return item
    })
    const response = await fetch(`${apiUrl}/delete-todo/${id}`, {
      method: 'DELETE',
    })
    console.log(updatedItems)
    setChecked(updatedItems)
  }

  const mappingToDoList = checked.map(({ text, completed, _id }) => (
    <ChecklistItem
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      text={text}
      key={_id}
      completed={completed}
      _id={_id}
      handleUserClick={handleUserClick}
      isEditClicked={isEditClicked}
      setIsEditClicked={setIsEditClicked}
      editInputValue={editInputValue}
      setEditInputValue={setEditInputValue}
      editItemId={editItemId}
      setEditItemId={setEditItemId}
    />
  ))
  return (
    <>
      <TextField
        type='text'
        value={inputValue}
        name='addToDo'
        onChange={(e) => handleInputChange(e)}
        variant='filled'
      />
      <Button onClick={() => handleAddItem()} variant='contained'>
        + Add
      </Button>
      {mappingToDoList}
    </>
  )
}

export default MainContent
