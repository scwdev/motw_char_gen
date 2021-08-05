import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button'
import Radio from '../../components/radio'

const Ratings = (props) => {
    
    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])
    
    let ratings = null

    // const path = props.match.params.playbook    
    // useEffect(() => {
    //     props.apiCall(`/playbooks/${path}`)}, [])

    const loading = () => {return 'Loading...'}
    const loaded = () => {
        ratings = {...props.newChar.ratings}
        return(
            props.apiData.ratings.map((option,index) => {
                const updateRatings = () => {
                    ratings = option
                    console.log(text)
                }
                const text = `Charm: ${option.charm}, Cool: ${option.cool}, Sharp: ${option.sharp}, Tough: ${option.tough}, Weird: ${option.weird}`
                return (
                    <>
                        <Radio id={`rating ${index}`} name='ratings' key={index} handleChange={updateRatings} value={option} text={text} />
                    </>
                )
            })
        )
    }

    const submit = () => {
        props.updateChar({...props.newChar, ratings: ratings})
    }

    return(
        <div>
            <h2>Ratings Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
            {/* {props.apiData ? loaded() : loading()} */}
            <Link to={`/${props.newChar.path}/gear`} >
                <Button handleClick={submit} text='next'/>
            </Link>
        </div>
    )
}

export default Ratings