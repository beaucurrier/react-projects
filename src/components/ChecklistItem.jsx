import PropTypes from "prop-types";

const ChecklistItem = (props) => {
  return (
    <div className='card'>
        <label htmlFor={`${props.todo}`}> {props.todo}
            <input type="checkbox" id="checkbox" name={`${props.todo}`}/>
        </label>
    </div>
  )
}

ChecklistItem.propTypes = {
    todo: PropTypes.string.isRequired,
  };

export default ChecklistItem