import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Radio from '../../components/radio'
import Notes from '../../components/notes'
import Submit from '../../components/submit'

const History = (props) => {
    const [playerCount, setPlayerCount] = useState(props.newChar.history.length)
    const [newEntry, setNewEntry] = useState({name:'', relationship: null, notes: null})

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        const historyArr = [...props.newChar.history]

        const handleRadio = (input) => {
            setNewEntry({...newEntry, relationship: input})
        }
        const handleName = (input) => {
            setNewEntry({...newEntry, name:input})
        }
        const handleNotes = (input) => {
            setNewEntry({...newEntry, notes:input})
        }

        const handleSubmit = (event) => {
            event.preventDefault()
            console.log(newEntry)
        }

        const newRelationship = () => {
            const name = <Notes handleChange={handleName} value={newEntry.name} />
            const relationship = props.apiData?.history?.map((item,index) => {
                return <Radio key={index} handleChange={handleRadio} id={item} name='history' value={item} text={item} />
            })
            const notes = <Notes handleChange={handleNotes} value={newEntry.notes} />
            const submit = <Submit value='Add Relationship' handleSubmit={handleSubmit} />
            
            
            return (
                <form>
                    {name}
                    {relationship}
                    {notes}
                    <input type='submit' onClick={handleSubmit}/>
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