import React, { useState } from 'react'
import ChecklistItem from './ChecklistItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const MainContent = () => {
  let toDoList = []

  const [checked, setChecked] = useState(toDoList)
  const [inputValue, setInputValue] = useState('')
  const [updatedValue, setUpdateValue] = useState('')

  const handleUserClick = (e) => {
    const tempArray = [...checked].map((item) =>
      item.id === e.target.id ? { ...item, completed: !item.completed } : item
    )
    setChecked(tempArray)
    console.log(checked)
  }
  const handleAddItem = () => {
    const newItem = {
      id: checked.length + 1,
      text: inputValue,
      htmlFor: inputValue,
      type: 'checkbox',
      name: inputValue,
    }
    setChecked([...checked, newItem])
    setInputValue('')
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleEdit = (id) => {
    const editItem = checked.find((item) => item.id === id)
    editItem.text = updatedValue
    const tempArray = [...checked].map((item) =>
      item.id == id ? editItem : item
    )
    setChecked(tempArray)
  }

  const handleDelete = (id) => {
    const updatedItems = checked.filter((item) => {
      if (item.id !== id) return item
    })
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
