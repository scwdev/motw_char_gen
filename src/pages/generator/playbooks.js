import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Playbooks = (props) => {
    const path = '/playbooks'

    // if (props.apiOrigin != path) {
    //     props.apiCall(path)
    // }
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    console.log('apiData:',props.apiData, 'apiOrigin', props.apiOrigin)
    const loaded = () => {
        return(
            props.apiData.results.map((item,index) => {
                
                // const expand = 

                const handleClick = () => {
                    props.updateChar({...props.newChar, playbook:item.name, path:item.index})
                }
                return(
                        <Button id={`${item.index}-button`} text={item.name} handleClick={handleClick} key={index}/>
                )
            })
        )
    }
    const loading = () => {
        return(
            'loading...'
        )
    }
    
    
    return(
        <div>
            <h2>Playbooks Component</h2>
            {props.apiOrigin === path ? loaded() : loading()}
            <Link to={`/${props.newChar.path}/moves`} >
                <Button /* handleClick={props.apiCall} */ text='next'/>
            </Link>
            
        </div>
    )
}

export default Playbooks