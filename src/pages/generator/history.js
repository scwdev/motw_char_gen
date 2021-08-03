import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const History = (props) => {
    const [playerCount, setPlayerCount] = useState(props.newChar.history.length)

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        const historyArr = [...props.newChar.history]
        
        const entries = historyArr.map((item, index) => {
            if (item.relationship != 'placeholder') {
                console.log(item.relationship)
                return (
                    <div>
                        <h4>{item.player}</h4>
                        <h5>{item.relationship}</h5>
                        <p>{item.notes}</p>
                    </div>
                ) 
            } else {return props.apiData.history.map((item,index) => {
                return <Button text={item}/>
                // })
                //     <div>
                //         <form>
                            
                //         </form>
                //     </div>
                // )
            })}
        })
        
            
        const addEntry = () => {
            setPlayerCount(playerCount+1)
            props.updateChar({...props.newChar, history:[...props.newChar.history, {index: playerCount, player: '', relationship: 'placeholder', notes: ''}]})

        }
        return(
            <>
                <Button handleClick={addEntry} text='add entry'/>
                {entries}
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