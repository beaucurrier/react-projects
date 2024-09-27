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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://todolistbackend-fb6e.onrender.com')
      const data = await response.json()
      toDoList(data.todos)
    }
    fetchData()
  }, [])

  const handleUserClick = (e) => {
    const tempArray = [...checked].map((item) =>
      item.id === e.target.id ? { ...item, completed: !item.completed } : item
    )
    setChecked(tempArray)
    console.log(checked)
  }
  const handleAddItem = async () => {
    const newItem = {
      id: checked.length + 1,
      text: inputValue,
      htmlFor: inputValue,
      type: 'checkbox',
      name: inputValue,
    }
    const response = await fetch(
      'https://todolistbackend-fb6e.onrender.com/add-todo',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      }
    )
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
    const editItem = checked.find((item) => item.id === id)
    editItem.text = editInputValue
    const tempArray = [...checked].map((item) =>
      item.id == id ? editItem : item
    )
    const response = await fetch(
      `https://todolistbackend-fb6e.onrender.com/edit-todo/${id}`,
      { method: 'POST' }
    )
    setChecked(tempArray)
  }

  const handleDelete = async (id) => {
    const updatedItems = checked.filter((item) => {
      if (item.id !== id) return item
    })
    const response = await fetch(
      `https://todolistbackend-fb6e.onrender.com/delete-todo/${id}`,
      { method: 'DELETE' }
    )
    console.log(updatedItems)
    setChecked(updatedItems)
  }

  const mappingToDoList = checked.map(
    ({ text, completed, htmlFor, type, id, name }) => (
      <ChecklistItem
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        text={text}
        htmlFor={htmlFor}
        type={type}
        key={id}
        completed={completed}
        id={id}
        name={name}
        handleUserClick={handleUserClick}
        isEditClicked={isEditClicked}
        setIsEditClicked={setIsEditClicked}
        editInputValue={editInputValue}
        setEditInputValue={setEditInputValue}
        editItemId={editItemId}
        setEditItemId={setEditItemId}
      />
    )
  )
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
