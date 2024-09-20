
const Input = ({label, id, type, onChange, value, ...rest})=>{
    return(
    <>
        <label htmlFor={id}> {label} </label>
        <input id={id} type={type} onChange={onChange} value={value} {...rest} />
    </>
    )
    }

export default Input