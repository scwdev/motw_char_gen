import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Details = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}
    
    let newLook = []
    // Once api call has completed:        
    const loaded = () => {
        const lookOptions = Object.entries(props.apiData.look)

        // stage stand-in array
        newLook = props.newChar.details.look

        const look = () => {
            return (lookOptions.map((section, index) => {
                console.log("Look Options:", lookOptions)
                return (section.map((subSection, index) => {
                    console.log("Sections: ", section)
                    if (index === 0) {return (<h3>{subSection}</h3>)
                    } else {return subSection.map((option, index) => {
                        console.log("options: ",option)
                        return (<Button key={index} text={option}/>)
                    })}
                }))
                // console.log(section, index)
                
                // else {console.log(section)}
                
                // } else {section.map((option, index) => {
                //     return <Button key={index} text={option} />
                // })}
            
            }))
        }

        return(
            <>
            it's working
            {look()}
            </>
        )
    
    





            // const chooseMoves = () => {
            //     if (newLook.includes(item.name) === true) {
            //         newLook = newLook.filter((i, d) => (i != item.name))
            //     } else if (newLook.length >= (moves.required_move_slots + moves.optional_move_slots) && newLook.includes(item.name) === false) {
            //         newLook.splice(moves.required_move_slots,1)
            //         newLook.push(item.name)
            //     } else if (newLook.includes(item.name) === false) {
            //         newLook.push(item.name)
            //     }
            //     console.log(props.newChar.moves.playbook)
            //     //// buttonText == buttonSmall ? buttonText = buttonBig : buttonText = buttonSmall
            }
            //the Component being mapped
        
        
        // return (
        //     <>
        //         {/* { ? null :'<h2>{moves.required_move_slots} Required Moves</h2>'{requiredMoves}
        //         } */}
        //         {requiredMoves()}
        //         <h2>Choose any additional {moves.optional_move_slots}:</h2>
        //         {optionalMoves}
        //     </> 
    //     )
    // }
    return(
        <div>
            <h2>Details Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}

        </div>
    )
}

export default Details