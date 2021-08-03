import React, {useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Radio from '../../components/Radio'
import Submit from '../../components/submit'

const History = (props) => {
    const [playerCount, setPlayerCount] = useState(props.newChar.history.length)

    const inputRefRelationship = useRef()
    const inputRefName = useRef()
    const inputRefNotes = useRef()

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        const historyArr = [...props.newChar.history]

        const newRelationship = () => {
            const map = props.apiData?.history?.map((item,index) => {
                return (
                <div ref={inputRefRelationship} >
                    <Radio id={item} name='history' text={item} />
                </div>)
            })
            const handleSubmit = () => {console.log(inputRefRelationship)}
            const submit = <Submit value='Add Relationship' handleSubmit={handleSubmit} />
            
            return (
                <form>
                    {map}
                    {submit}
                </form>
            )
            }
        

        return(
            <>
                {newRelationship()}
            </>
            
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