import PropTypes from 'prop-types'
import Input from './Input'
import { TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const ChecklistItem = ({
  handleDelete,
  _id,
  text,
  completed,
  handleUserClick,
  isEditClicked,
  setIsEditClicked,
  editInputValue,
  setEditInputValue,
  handleEdit,
  editItemId,
  setEditItemId,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => handleUserClick(e)}
            checked={completed}
            type={'checkbox'}
            id={`${_id}`}
          />
        }
        label={text}
        htmlFor={htmlFor}
      />

      <Button
        variant='outlined'
        onClick={() => handleDelete(_id)}
        id={`${_id}`}
      >
        Delete
      </Button>
      {!isEditClicked && (
        <Button
          variant='outlined'
          onClick={() => {
            setIsEditClicked(!isEditClicked)
            setEditInputValue(text)
            setEditItemId(_id)
          }}
          id={`${_id}`}
        >
          Edit
        </Button>
      )}
      {isEditClicked && editItemId === _id && (
        <>
          {' '}
          <TextField
            type='text'
            value={editInputValue}
            name='addToDo'
            onChange={(e) => setEditInputValue(e.target.value)}
            variant='filled'
          />
          <Button
            variant='outlined'
            onClick={() => {
              handleEdit(_id)
              setIsEditClicked(!isEditClicked)
            }}
            id={`${_id}`}
          >
            Update
          </Button>
        </>
      )}
    </FormGroup>
  )
}

export default ChecklistItem
