import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Details = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}
    
    let newLook = []
    
    const loaded = () => {
        const lookOptions = Object.entries(props.apiData.look)
        
        return (
            lookOptions.map((subArr) => {return subArr.map((section,index) => {
                if (typeof section == 'string') return <h4>{section}</h4>
                 else {return section.map((option,index) => {
                    console.log(section,option) 
                    return(
                     
                     <Button key={index} text={option}/>

                 )

                 })
                    
                }
            })
            }))
    }

    return(
        <div>
            <h2>Details Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}

        </div>
    )
}

export default Details