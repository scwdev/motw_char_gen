import React, {useEffect} from 'react'

const History = (props) => {

    const path = props.match.params.playbook
    
    useEffect(() => {
        if (props.apiData) props.apiCall(`/playbooks/${path}`)}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        return(
            'placeholder'
        )
    }

    return(
        <div>
            <h2>History Componenet</h2>
            {props.apiData ? loaded() : loading()}
        </div>
    )
}

export default History