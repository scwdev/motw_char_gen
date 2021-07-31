import React, {useEffect} from 'react'

const Specials = (props) => {

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
            <h2>Specials Componenet</h2>
            {props.apiData ? loaded() : loading()}
        </div>
    )
}

export default Specials