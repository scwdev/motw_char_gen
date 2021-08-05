import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Checkbox from '../../components/checkbox'

/////////////////////////

const Moves = (props) => {
    const [newMoves, setNewMoves] = useState([...props.newChar.moves.playbook])
    //page content currently based on path, not on newChar playbook. Could be a problem
    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    // const path = props.match.params.playbook
    // useEffect(() => {
    //     props.apiCall(`/playbooks/${path}`)}, [])

    // Once api call has completed:        
    const loaded = () => {
        const moves = props.apiData.moves
        // stage stand-in array

        // function to populate required moves and add them to stand-in (if there are any)
        const requiredMoves = () => {
            if (moves.required_move_slots > 0) {
                return(
                    moves.required_moves.map((item,index) => {
                        const checked = () => {return true}
                        if (newMoves.includes(item) !== true) {
                            setNewMoves([...newMoves, item])
                        }  
                        return (
                            <Checkbox key={index} text={[<h3>{item.name}</h3>, <p>{item.description}</p>]} checked={checked} className={'required-moves'}  />
                        )
                    })
                )
            }
        }
        // function to populate optional moves + handler function for adding to stand-in
        const optionalMoves = moves.optional_moves.map((item,index) => {
            
            const expandedText = () => {
                if (newMoves.includes(item) == true) {
                    return (
                        <p>{item.description}</p>
                    )
                }
            }

            let text = <><span>{item.name}</span>{expandedText()}</>
            //handler function
            const chooseMoves = (e) => {
                let optMoves = [...newMoves]
                if (optMoves.includes(item) === true) {
                    optMoves = optMoves.filter((i, d) => (i != item))
                } else if (optMoves.length >= (moves.required_move_slots + moves.optional_move_slots) && optMoves.includes(item) === false) {
                    optMoves.splice(moves.required_move_slots,1)
                    optMoves.push(item)
                } else if (optMoves.includes(item) === false) {
                    optMoves.push(item)
                }
                // console.log(optMoves)
                setNewMoves([...optMoves])
                props.updateChar({...props.newChar, moves:{...props.newChar.moves, playbook:optMoves}})
                //// text == buttonSmall ? text = buttonBig : text = buttonSmall
            }

            const checked = () => {
                if (newMoves.includes(item) == true) {
                    return true
                }
            }


            //the Component being mapped
            return (
                <Checkbox  handleChange={chooseMoves} key={item.name} id={item.name} text={text} checked={checked} className={'optional-moves'} />

            )
        })
        // calling the two maps:
        return (
            <>
                {/* <h2>The {props.apiData.index.charAt(0).toUpperCase()+path.slice(1)} Moves</h2> */}
                <h2>
                Your moves:
                </h2>
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

    const submit = () => {
        props.updateChar({...props.newChar, moves:{...props.newChar.moves, playbook:newMoves}})
    }

    return(
        <div className='page'>
            <section className='scroll'>
                {props.apiOrigin === path ? loaded() : loading()}
            </section>
            <Link to={`/${props.newChar.path}/ratings`} >
                <Button handleClick={submit} text='Next Page'/>
            </Link>
        </div>
    )
}

export default Moves