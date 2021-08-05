import React, {useRef} from 'react'


const Checkbox = (props) => {


    const handleChange = (event) => {
        if (props.handleChange) {
            props.handleChange(props.value)
        }
        else {
            console.log('checkbox needs a function')
            // console.log(event)
        }
    }

    const checkbox = 
        <>
            <input onChange={handleChange} type="checkbox" id={props.id} name={props.name} value={props.value} checked={props.checked()}/>
            <label for={props.id}>{props.text}</label> <br/>
        </>
    
    return (
        <>    
            {checkbox}
        </>
    )
}

export default Checkbox