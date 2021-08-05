import React, {useEffect, useState} from 'react'
import Checkbox from '../../components/checkbox'

import Radio from '../../components/radio'

const Specials = (props) => {
    const [specials, setSpecials] = useState([])
    const [newSpecials, setNewSpecials] = useState({...props.newChar.specials})

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : dataFilter()}, [props.apiData])

    const dataFilter = () => {
        const tempArray = []
        const filter = ['index', 'name', 'luck_special', 'moves', 'ratings', 'history', 'improvements', 'advanced_improvements', 'gear', 'look']
        const arrays = Object.entries(props.apiData)
        arrays.map((item, index) =>  {
            if (filter.includes(item[0]) == false) {
                tempArray.push(item)}})
        if (props.match.params.playbook == 'spell-slinger') {
            tempArray[0].splice(1,0,'Pick 3, at least 1 base')
        }  
        if (props.match.params.playbook == 'monstrous') {
            tempArray[1].splice(1,0,'Pick 2, at least 1 base')
        }  
        setSpecials(tempArray)
    }

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        let title = null
        let titleString = null
        let limit = null
        const parseData = () => {
            return specials.map(m => m.map((item) => {
                if (typeof item == 'string') {
                    title = item
                    titleString = title.split('_').join(' ')
                    // setNewSpecials({...newSpecials, title: null})
                    return <h3>{titleString}</h3>
                } else if (Array.isArray(item) == true) {
                    return item.map((entry, index) => {
                        const keyValue = {[title]:entry}
                        const handleRadio = () => {                        
                            setNewSpecials({...newSpecials, ...keyValue})
                        }
                        if (typeof entry == 'string' && typeof item[index-1] != 'number') {
                            return <Radio key={index} handleChange={handleRadio} id={entry} name={titleString} value={entry} text={entry} />
                        }
                        if (typeof entry == 'object' && Array.isArray(entry) == false ) {
                            return <Radio key={index} handleChange={handleRadio} id={entry.name} name={titleString} value={entry} text={<><span>{entry.name}</span>: {entry.description}</>} />
                        } else console.log('you missed somthing 1')
                    })
                } 
                else if (typeof item == 'object') {
                    // console.log(item)
                    return Object.entries(item).map((tup) => {

                        if (typeof tup[1] == 'number') {
                            limit = tup[1]
                        } else if (Array.isArray(tup[1]) == true) {
                            title = tup[0]
                            titleString = title.split('_').join(' ')
                            if (newSpecials.hasOwnProperty(title) == false) {
                                console.log(title)
                                setNewSpecials({...newSpecials, [title]:[]})
                            }
                            // setNewSpecials({...newSpecials, test: 'test'})
                            
                            let tupArray = tup[1].map((i,d) => {
                                
                                const innerTitle = title
                                let innerLimit = null
                                {limit > 1 ? innerLimit = limit : innerLimit = 1}
                                let checkedArr = newSpecials[innerTitle]
                                let checked = () => {
                                    if (Object.values(checkedArr).includes(i) == true) {return true}
                                    
                                }
                                const handleChange = () => {
                                    if (checkedArr.includes(i) === true) {
                                        checkedArr = checkedArr.filter((x, d) => (x != i))
                                    } else if (checkedArr.length >= (innerLimit) && checkedArr.includes(i) === false) {
                                        checkedArr.shift()
                                        checkedArr.push(i)
                                    } else if (checkedArr.includes(i) === false) {
                                        checkedArr.push(i)
                                    }
                                    setNewSpecials({...newSpecials, [innerTitle]:[...checkedArr]})
                                    props.updateChar({...props.newChar, specials:{...props.newChar.specials, ...newSpecials}})

                                    
                                }

                                if (i.description) {
                                    return (
                                        <Checkbox handleChange={handleChange} key={i.name} id={i.name} name={titleString} checked={checked} value={i} text={`${i.name}: ${i.description}`}/>
                                    )
                                    // <p>{i.name}: {i.description}</p>
                                }
                                else if (i.harm >= 0) {
                                    return (
                                        <Checkbox handleChange={handleChange} key={i.name} id={i.name} name={titleString} checked={checked} value={i} text={`${i.name}, ${i.harm}, (${i.tags.map((tag) => {return tag.name})})`}/>
                                    )
                                    //          <p>{i.name}, {i.harm}, ({i.tags.map((tag) => {return tag.name})})</p>
                                }
                                else {
                                    return (
                                        <Checkbox handleChange={handleChange} key={i} id={i} name={titleString} checked={checked} value={i} text={i}/>
                                    )
                                    // <p>{i}</p>
                                }   
                            })
                            return (
                                <div>
                                    <h4>{titleString}{limit > 1 ? ` (pick ${limit})` : ''}</h4>
                                    {tupArray}
                                </div>
                            )
                        } else console.log("you missed something 2")
                    })
                } else console.log("you missed somthing 3")
            })
            )
        }
        
        return(
            <div>
                loaded
                {parseData()}
            </div>   
        )
    }

    return(
        <div>
            <h2>Specials Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
        </div>
    )
}

export default Specials