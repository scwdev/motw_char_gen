import React, {useRef} from 'react'


const Radio = (props) => {

    // const checked = null
    const handleChange = () => {
        if (props.handleChange) props.handleChange(props.value)
        else console.log('radio needs a function')
    }

    const radio = 
        <>
            <input onChange={handleChange} type="radio" id={props.id} name={props.name} value={props.value} />
            <label for={props.id}>{props.text}</label>
        </>
    
    return (
        <>
            {radio}
        </>
        
    )
}

export default Radio
