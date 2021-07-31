import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

/////////////////////////

const Moves = (props) => {

    //page content currently based on path, not on newChar playbook. Could be a problem
    const path = props.match.params.playbook
    useEffect(() => {
        props.apiCall(`/playbooks/${path}`)}, [])

    // Once api call has completed:        
    const loaded = () => {
        const moves = props.apiData.moves
        // stage stand-in array
        let newMoves = props.newChar.moves.playbook 
        
        
        // function to populate required moves and add them to stand-in (if there are any)
        const requiredMoves = () => {
            if (moves.required_move_slots > 0) {
                return(
                    moves.required_moves.map((item,index) => {
                        if (newMoves.includes(item.name) == false) {newMoves.push(item.name)}  
                        return <Button className={'required-moves'} key={index} text={[<h3>{item.name}</h3>, <p>{item.description}</p>]} />
                    })
                )
            }
        }
        // function to populate optional moves + handler function for adding to stand-in
        const optionalMoves = moves.optional_moves.map((item,index) => {
            //// const buttonSmall = [<h3>{item.name}</h3>]
            const buttonBig = [<h3>{item.name}</h3>, <p>{item.description}</p>]
            let buttonText = buttonBig
            //handler function
            const handleClick = () => {
                if (newMoves.includes(item.name) === true) {
                    newMoves = newMoves.filter((i, d) => (i != item.name))
                } else if (newMoves.length >= (moves.required_move_slots + moves.optional_move_slots) && newMoves.includes(item.name) === false) {
                    newMoves.splice(moves.required_move_slots,1)
                    newMoves.push(item.name)
                } else if (newMoves.includes(item.name) === false) {
                    newMoves.push(item.name)
                }
                //// buttonText == buttonSmall ? buttonText = buttonBig : buttonText = buttonSmall
            }
            //the Component being mapped
            return <Button className={'optional-moves'} handleClick={handleClick} key={index} text={buttonText} />
        })
        // calling the two maps:
        return (
            <>
                {/* { ? null :'<h2>{moves.required_move_slots} Required Moves</h2>'{requiredMoves}
                } */}
                {requiredMoves()}
                <h2>Choose any additional {moves.optional_move_slots}:</h2>
                {optionalMoves}
            </> 
        )
    }

    // until api call has completed
    const loading = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div>
            <h2>The {path.charAt(0).toUpperCase()+path.slice(1)} Moves</h2>
            {props.apiData ? loaded() : loading()}
            <Link to={`/${props.newChar.path}/ratings`} >
                <Button handleClick={props.apiCall} text='next'/>
            </Link>
        </div>
    )
}

export default Moves