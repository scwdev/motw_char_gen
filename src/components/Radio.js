import React, {useRef} from 'react'


const Radio = (props) => {

    const checked = null
    const handleChange = () => {
        props.handleChange(props.value)
    }

    const radio = 
        <>
            <input onChange={handleChange} type="radio" id={props.id} name={props.name} value={props.value} checked={checked}/>
            <label for={props.id}>{props.text}</label> <br/>
        </>
    
    return (
        <div className={`radio-div`}>
                {radio}
        </div>
        
    )
}

export default Radio