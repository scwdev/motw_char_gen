import React from 'react'


const Button = (props) => {
    return (
        <div className={`button-div`}>
            <button className={'button'} id={props.id} onClick={props.handleClick}>{props.text}</button>
        </div>    
    )
}

export default Button