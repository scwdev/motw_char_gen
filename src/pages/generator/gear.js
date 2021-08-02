import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Gear = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin !== path ? props.apiCall(path) : console.log('same API')}, [])
    
    let gearArr = null
    let newGear = []

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        gearArr = Object.values(props.apiData.gear)

        if (props.newChar.path === 'wronged') {
            let armor = `${gearArr[0].name} - armor ${gearArr[0].armour}`
            gearArr.splice(0,1,armor)
            let carArr = []
            gearArr[1].forEach((item, index) => {
                let newCar = {name: item, harm: null, tags: ['']}
                carArr.push(newCar)
            })
            gearArr.splice(1,1,1,carArr)
        }

        let position = 0
        let limit = 0
        let addGear = (entry, position, limit) => {
            let subArr = newGear[position]

            if (subArr.includes(entry) === true) {
                subArr = subArr.filter((i) => (i != entry))
            } else if (subArr.length >= (limit) && subArr.includes(entry) === false) {
                subArr.splice(0,1)
                subArr.push(entry)
            } else if (subArr.includes(entry) === false) {
                subArr.push(entry)
            }
            // props.updateChar({...props.newChar, gear:{...props.newChar.gear, playbook:newGear}})
            console.log('button click', newGear)
        }

        return(
            gearArr.map((item, index) => {
                if (props.newChar.path === 'initiate') {
                    return( 'initiate')

                } else if (typeof item === 'string') {
                    return <h3 key={index} >{item}</h3>
                    
                } else if (typeof item === 'number') {
                    limit = item
                    position = newGear.length
                    newGear.push([])
                    return <h3 key={index} >Choose {item}</h3>
                    
                } else if (typeof item === 'object') {return (item.map((z, index) => {
                    let internalLimit = limit
                    let internalPosition = position
                    if (typeof z === 'object') {
                        let tag = z.tags.map(tag => tag.name).toString()
                        let text = `${z.name}${z.harm !== null ? `, harm: ${z.harm}` : ""}${tag !== "" ? `, tags: ${tag}` : ""}`
                        return (
                            <Button key={index} text={text} handleClick={() => {addGear(z,internalPosition,internalLimit)}} />
                        )
                    } else if (typeof z === 'string') {
                        let text = z
                        return (
                            <Button key={index} text={text} handleClick={() => {addGear(text,internalPosition,internalLimit)}}/>
                        )
                    }
                }))}
            })
        )
    }

    const submit = () => {
        props.updateChar({...props.newChar, gear:{...props.newChar.gear, playbook: newGear}})
        console.log(props.newChar)
    }

    return(
        <div>
            <h2>Gear Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
            <Link to={`/${props.newChar.path}/details`} >
                <Button text='Next' handleClick={submit} />
            </Link>
        </div>
    )
}

export default Gear