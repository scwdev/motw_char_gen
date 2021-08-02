import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const History = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        return(
            'placeholder'
        )
    }

    return(
        <div>
            <h2>History Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}

        </div>
    )
}

export default History