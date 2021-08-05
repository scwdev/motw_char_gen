import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Radio from '../../components/radio'

const Playbooks = (props) => {
    const path = '/playbooks'

    // if (props.apiOrigin != path) {
    //     props.apiCall(path)
    // }
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])

    // console.log('apiData:',props.apiData, 'apiOrigin', props.apiOrigin)
    const loading = () => {return 'loading...'}
    const loaded = () => {

        const playbookMap = () => {
            

            return props.apiData.results.map((item,index) => {
                const handleChange = () => {
                    props.updateChar({...props.newChar, playbook:item.name, path:item.index})
                }
                const expandedText = () => {
                    return (
                        <div>
                            {/* <h4>{item.name}</h4> */}
                            <p>Some descriptive text</p>
                        </div>
                    )
                }
                return(
                    <form>
                        <Radio key={item.name} id={item.name} name='playbooks' text={item.name} handleChange={handleChange} />
                        {props.newChar.path == item.index ? expandedText() : ''}
                    </form>
                )
            })
        }

        return (
            <>
                {playbookMap()}
            </>
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