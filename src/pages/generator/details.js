import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Details = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    let newLook = {}

    const loading = () => {return 'Loading...'}
    
    const loaded = () => {
        const lookOptions = Object.entries(props.apiData.look)
        
        return (
            lookOptions.map(subArr => {return subArr.map((section, i, arr) => {
                if (typeof section == 'string') {
                    return <h4>{section}</h4>}
                else {
                    return section.map((option, index) => {
                        const addLook = () => newLook[arr[0]] = option
                        console.log(index)
                        return <Button key={index} text={option} handleClick={addLook}/>})}
            })})
        )
    }

    const submit = () => {
        props.updateChar({...props.newChar, details:{...props.newChar.details, look: newLook}})
        // props.updateChar({...props.newChar, gear:{...props.newChar.gear, playbook: newGear}})
        console.log('text')
        // console.log(props.newChar)
    }

    return(
        <div>
            <h2>Details Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
            <Link to={`/${props.newChar.path}/history`} >
                <Button text='next' handleClick={submit} />
            </Link>
            
        </div>
    )
}

export default Details