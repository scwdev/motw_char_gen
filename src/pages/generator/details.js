import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Radio from '../../components/radio'
import Button from '../../components/button'
import Notes from '../../components/notes'

const Details = (props) => {
    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {if (props.apiOrigin != path) props.apiCall(path)}, [])

    const [details, setDetails] = useState(props.newChar.details)

    const loading = () => {return 'Loading...'}
    const loaded = () => {

        const pronouns = () => {
            const handlePronouns = (input) => {
                setDetails({...details, pronouns:input})
            }
            return(
                <Notes handleChange={handlePronouns} value={details.pronouns} placeholder="Hunter pronouns" />
            )
        }
        
        const lookMap = () => {
            const lookOptions = Object.entries(props.apiData.look)
            let title = null
            return lookOptions.map(subArr => {return subArr.map((section, i, arr) => {
                if (typeof section == 'string') {
                    title = section
                    return <h4>{section}</h4>
                }
                else {
                    return section.map((option, index) => {
                        const newLook = {[title]:option}
                        const addLook = () => {
                            setDetails({...details, look:{...details.look, ...newLook}})
                            
                        }
                        return <Radio key={`${title}${index}`} handleChange={addLook} id={`${title}${index}`} name={title} value={option} text={option} />
                    })
                }
            })})
        }
        
        const notes = () => {
            const handleNotes = (input) => {
                setDetails({...details, notes:input})

            }
            return(
                <Notes handleChange={handleNotes} value={details.notes} placeholder="Hunter notes" />
            )
        }

        const submit = (event) => {
            // event.preventDefault()
            props.updateChar({...props.newChar, details:{...details}})
        }

        return (
            <form>
                
                {pronouns()}
                {lookMap()}
                {notes()}
                <Link to={`/${props.    newChar.path}/history`} >
                    <input type='submit' value='Next Page' onsubmit={submit}/>
                </Link>
            </form>
        )
    }

    

    return(
        <div>
            <h2>Details Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
            
        </div>
    )
}

export default Details