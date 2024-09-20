import PropTypes from 'prop-types'
import Input from './Input'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const ChecklistItem = ({
  handleEdit,
  handleDelete,
  htmlFor,
  type,
  id,
  name,
  text,
  completed,
  handleUserClick,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => handleUserClick(e)}
            checked={completed}
            type={type}
            id={`${id}`}
            name={name}
          />
        }
        label={text}
        htmlFor={htmlFor}
      />
      <Button variant='outlined' onClick={() => handleDelete(id)} id={`${id}`}>
        Delete
      </Button>
      {isEditClicked && (
        <Button variant='outlined' onClick={() => handleEdit(id)} id={`${id}`}>
          Edit
        </Button>
      )}
      {!isEditClicked && (
        <TextField
          type='text'
          value={inputValue}
          name='addToDo'
          onChange={(e) => handleInputChange(e)}
          variant='filled'
        />
      )}
    </FormGroup>
  )
}

export default ChecklistItem
