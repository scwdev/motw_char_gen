import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button'

const Ratings = (props) => {
    let ratings = null

    const path = props.match.params.playbook    
    useEffect(() => {
        props.apiCall(`/playbooks/${path}`)}, [])

    const loading = () => {return 'Loading...'}
    const loaded = () => {
        ratings = {...props.newChar.ratings}
        return(
            props.apiData.ratings.map((option,index) => {
                const updateRatings = () => {
                    ratings = option
                }
                return (
                    <Button key={index} handleClick={updateRatings} text={
                        `Charm: ${option.charm}, Cool: ${option.cool}, Sharp: ${option.sharp}, Tough: ${option.tough}, Weird: ${option.weird}`} />
                )
            })
        )
    }

    const submit = () => {
        props.updateChar({...props.newChar, ratings: ratings})
        props.apiCall()
        console.log(props.newChar)
    }

    return(
        <div>
            <h2>Ratings Componenet</h2>
            {props.apiData ? loaded() : loading()}
            <Link to={`/${path}/gear`} >
                <Button handleClick={submit} text='next'/>
            </Link>
        </div>
    )
}

export default Ratings