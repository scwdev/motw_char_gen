import React from 'react'


const Notes = (props) => {

    const handleChange = (event) => {
        props.handleChange(event.target.value)
        console.log(event.target.value)
    }

    const notes = 
        <>
            <input onChange={handleChange} type='text' id={props.id} name={props.name} placeholder={props.placeholder} value={props.value} />
        </>
    
    return (
        <div className={`notes-div`}>
                {notes}
        </div>
        
    )
}

export default Notes