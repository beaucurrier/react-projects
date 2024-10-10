/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'
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
    import.meta.env.VITE_API_URL || 'https://todolistback-cbxs.onrender.com'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/todos`)
        const data = await response.json()
        console.log(data, 'useEffect')
        setChecked(data.todos)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleUserClick = async (id) => {
    const clickedItem = [...checked].find((item) => item._id === id)
    const updatedTodo = { ...clickedItem, completed: !clickedItem.completed }
    console.log(updatedTodo, 'updated Todo')
    const res = await fetch(`${apiUrl}/edit-item/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: updatedTodo.text,
        completed: updatedTodo.completed,
      }),
    })
    const updatedData = await res.json()
    console.log(updatedData, 'updated Data')
    setChecked((prev) =>
      prev.map((item) => (item._id === id ? updatedData : item))
    )
    console.log(checked)
  }
  const handleAddItem = async () => {
    const newItem = {
      text: inputValue,
    }
    console.log(newItem, 'newItem')
    try {
      const response = await fetch(`${apiUrl}/add-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })
      const createdItem = await response.json()
      console.log(createdItem, 'createdItem')
      if (!response.ok) {
        console.error('error adding item')
      }

      setChecked([...checked, createdItem])
    } catch (error) {
      console.error('failed to fetch Todos', error)
    }
    setInputValue('')
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleEdit = async (id) => {
    let editItem = [...checked].find((item) => item._id === id)
    const itemToEdit = { ...editItem, text: editInputValue }
    const res = await fetch(`${apiUrl}/edit-item/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: editInputValue,
        completed: itemToEdit.completed,
      }),
    })
    const updatedEditItem = await res.json()
    const tempArray = [...checked].map((item) =>
      item._id == id ? updatedEditItem : item
    )
    setChecked(tempArray)
  }
  const handleDelete = async (id) => {
    const updatedItems = checked.filter((item) => {
      if (item._id !== id) return item
    })
    await fetch(`${apiUrl}/delete-item/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(updatedItems)
    setChecked(updatedItems)
  }
  const mappingToDoList = checked.map(({ text, completed, _id }) => (
    <ChecklistItem
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      text={text}
      completed={completed}
      _id={_id}
      key={_id}
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
