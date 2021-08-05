import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Checkbox from '../../components/checkbox'

const Gear = (props) => {
    const [newGear, setNewGear] = useState([...props.newChar.gear.playbook])

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {if (props.apiOrigin !== path) props.apiCall(path)}, [])
    
    let gearArr = null

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        gearArr = Object.values(props.apiData.gear)
        console.log(newGear)
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
            let arr = [...newGear]
            let n = position
            // console.log('arr // ',arr)
            if (arr[n].includes(entry) === true) {
                arr[n] = arr[n].filter((i) => (i != entry))
            } else if (arr[n].length >= (limit) && arr[n].includes(entry) === false) {
                arr[n].shift()
                arr[n].push(entry)
            } else if (arr[n].includes(entry) === false) {
                arr[n].push(entry)
            }
            setNewGear([...arr])
            props.updateChar({...props.newChar, gear:{...props.newChar.gear, playbook:newGear}})
        }

        
        return(
            
            gearArr.map((arr, b) => {
                if (props.newChar.path === 'initiate') {
                    return( 'initiate')
                } 
                // else if (typeof arr === 'string') {
                //     return <h3 key={b} >{arr}</h3>
                // }
                else if (typeof arr === 'number') {
                    limit = arr
                    return <h3 key={b} >Choose {arr}</h3>
                }
                else if (typeof arr === 'object') {
                    
                    return (arr.map((item, y) => {
                        let internalLimit = limit
                        let internalPosition = (b-1)/2

                        let checked = () => {
                            if (newGear[internalPosition].includes(item)) {
                                return true
                            }
                        }

                        if (newGear.length < internalPosition+1) {
                            setNewGear([...newGear, []])
                        }
                        if (typeof item === 'object') {
                            let tag = item.tags.map(tag => tag.name).toString()
                            let text = `${item.name}${item.harm !== null ? `, harm: ${item.harm}` : ""}${tag !== "" ? `, tags: ${tag}` : ""}`
                            return (
                                <Checkbox key={item.name} id={item.name} name={`gear${b}`} text={text} handleChange={() => {addGear(item,internalPosition,internalLimit)}} checked={checked} />
                            )
                        }
                        if (typeof item === 'string') {
                            let text = item
                            return (
                                <Checkbox key={item} id={item} name={`gear${b}`} text={text} handleChange={() => {addGear(item,internalPosition,internalLimit)}} checked={checked}/>
                            )
                        }
                    }))
                }
            })
        )
    }

    const submit = () => {
        props.updateChar({...props.newChar, gear:{...props.newChar.gear, playbook: newGear}})
        console.log(props.newChar)
    }

    return(
        <div className='page'>
            <h2>Gear Componenet</h2>
            <section className='scroll'>
                {props.apiOrigin === path ? loaded() : loading()}
            </section>
            <Link to={`/${props.newChar.path}/details`} >
                <Button text='Next' handleClick={submit} />
            </Link>
        </div>
    )
}

export default Gear