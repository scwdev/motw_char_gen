import React, {useEffect, useState} from 'react'
import Checkbox from '../../components/checkbox'

import Radio from '../../components/radio'

const Specials = (props) => {
    const [specials, setSpecials] = useState([])
    const [newSpecials, setNewSpecials] = useState([])

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : dataFilter()}, [props.apiData])

    const dataFilter = () => {
        const tempArray = []
        const filter = ['index', 'name', 'luck_special', 'moves', 'ratings', 'history', 'improvements', 'advanced_improvements', 'gear', 'look']
        const arrays = Object.entries(props.apiData)
        arrays.map((item, index) =>  {
            if (filter.includes(item[0]) == false) {
                tempArray.push(item)}})
        setSpecials(tempArray)
    }

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        let titleString = null
        let limit = null
        const parseData = () => {
            return specials.map(m => m.map((item) => {
                if (typeof item == 'string') {
                    titleString = item.split('_').join(' ')
                    return <h3>{titleString}</h3>
                } else if (Array.isArray(item) == true) {
                    return item.map((entry, index) => {

                        if (typeof entry == 'string' && typeof item[index-1] != 'number') {
                            return <Radio key={index} /*handleChange={handleRadio}*/ id={entry} name={titleString} value={entry} text={entry} />
                        } else if (typeof entry == 'object' && Array.isArray(entry) == false ) {
                            return <Radio key={index} /*handleChange={handleRadio}*/ id={entry.name} name={titleString} value={entry} text={<><span>{entry.name}</span>: {entry.description}</>} />
                        } else console.log('you missed somthing 1')
                    })
                } 
                else if (typeof item == 'object') {
                    return Object.entries(item).map((tup) => {

                        if (typeof tup[1] == 'number') {
                            limit = tup[1]
                        } else if (Array.isArray(tup[1]) == true) {
                            titleString = tup[0].split('_').join(' ')

                            let tupArray = tup[1].map((i,d) => {
                                // return <p>{i.name}: {i.description} {i?.harm} {`, (${i.tags?.map((tag) => {return tag.name})})`}</p>
                                if (i.description) {
                                    const handleChange = () => {
                                        console.log(specials)
                                    }
                                    return (
                                        <Checkbox handleChange={handleChange} key={i.name} id={i.name} name={titleString} value={i} text={`${i.name}: ${i.description}`}/>
                                    )
                                    // <p>{i.name}: {i.description}</p>
                                }
                                else if (i.harm >= 0) {
                                    return <p>{i.name}, {i.harm}, ({i.tags.map((tag) => {return tag.name})})</p>
                                }
                                else {
                                    return <p>{i}</p>
                                }   
                            })
                            return (
                                <div>
                                    <h4>{titleString} (pick {limit > 1 ? limit : 1})</h4>
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