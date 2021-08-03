import React from 'react'


const Radio = (props) => {


    const radio = 
        <>
            <input type="radio" id={props.id} name={props.name} value={props.value}/>
            <label for={props.id}>{props.text}</label> <br/>
        </>
    
    return (
        <div className={`radio-div`}>
                {radio}
        </div>
        
    )
}

export default Radio