import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Playbooks = (props) => {

    useEffect(() => {props.apiCall('/playbooks')}, [])

    //// need Playbook description CMS
    // const fetchPb = (url) => {
    //     const newApi = url
    //     const response = await fetch(newApi)
    //     const data = await response.json()
    //     return (
    //     )
    // }
    let path = 'bla'
    // console.log('render')
    const loaded = () => {
        return(
            props.apiData.results.map((item,index) => {
                
                // const expand = 

                const handleClick = () => {
                    // let update = {...props.newChar}
                    // update.playbook = item.name
                    // update.path = item.index
                    props.updateChar({...props.newChar, playbook:item.name, path:item.index})
                    // path = props.newChar.path
                    // console.log(path)
                    // fetchPb(item.url)
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
            {props.apiData ? loaded() : loading()}
            <Link to={`/${props.newChar.path}/moves`} >
                <Button handleClick={props.apiCall} text='next'/>
            </Link>
            
        </div>
    )
}

export default Playbooks