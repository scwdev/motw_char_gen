import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Radio from '../../components/radio'
import Notes from '../../components/notes'
import Submit from '../../components/submit'

const History = (props) => {
    const [newEntry, setNewEntry] = useState({name:'', relationship: null, notes: null})

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        let historyArr = [...props.newChar.history]

        const handleRadio = (input) => setNewEntry({...newEntry, relationship: input})
        const handleName = (input) => setNewEntry({...newEntry, name:input})
        const handleNotes = (input) => setNewEntry({...newEntry, notes:input})

        const handleSubmit = (event) => {
            event.preventDefault()
            historyArr=[...historyArr, newEntry]
            props.updateChar({...props.newChar, history:historyArr})
        }

        const newRelationship = () => {

            const name = <Notes handleChange={handleName} value={newEntry.name} placeholder="Hunter name" />
            const relationship = props.apiData?.history?.map((item,index) => {
                return <Radio key={index} handleChange={handleRadio} id={item} name='history' value={item} text={item} />
            })
            const notes = <Notes handleChange={handleNotes} value={newEntry.notes} placeholder='Additional details...' />
            
            // const submit = <Submit id="add-relationship" text='Add Relationship' value='Add Relationship' handleSubmit={handleSubmit} />
            
            return (
                <form>
                    {name}
                    {relationship}
                    {notes}
                    {<input type='submit' value={'Add Relationship'} onClick={handleSubmit}/>}
                </form>
            )
        }
        
        const existingRelationships = () => {
            return historyArr.map((item,index) => {
                console.log(item)
                return(
                    <div>
                        <h3>{item.name}</h3>
                        <h5>{item.relationship}</h5>
                        <p>{item.notes}</p>
                    </div>
                )
            })
        }

        return(
            <>
                {newRelationship()}
                {existingRelationships()}
            </>
        )
    }

    const nextPage = () => {

    }

    return(
        <div className='page'>
            <h2>History Componenet</h2>
            <section className='scroll'>
                {props.apiOrigin === path ? loaded() : loading()}  
            </section>
            <Link to={`/${props.newChar.path}/specials`} >
                <Button handleClick={nextPage} text='next'/>
            </Link>
            
        </div>
    )
}

export default History