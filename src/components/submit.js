import React from 'react'


const Submit = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit()
        console.log(event)
    }

    const submit = 
        <>
            <input type="submit" id={props.id} onClick={handleSubmit}/>
            <label for={props.id}>{props.text}</label> <br/>
        </>
    
    return (
        <div className={`submit-div`}>
                {submit}
        </div>
        
    )
}

export default Submit