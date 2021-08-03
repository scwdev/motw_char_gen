import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Radio from '../../components/radio'

const Specials = (props) => {
    const [specials, setSpecials] = useState([])

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
        let title = null
        const parseData = () => {
            return specials.map(m => m.map((item) => {
                if (typeof item == 'string') {
                    title = item
                    return <h3>{item}</h3>
                } else if (Array.isArray(item) == true) {return item.map((entry, index) => {
                    if (typeof entry == 'string' && typeof item[index-1] != 'number') 
                        return <Radio key={index} /*handleChange={handleRadio}*/ id={entry} name={title} value={entry} text={entry} />
                    else if (typeof entry == 'string' && typeof item[index-1] == 'number') 
                        console.log("radio won't work for ", item)
                        // more stuff here
                    else if (typeof entry == 'object' && Array.isArray(entry) == false ) 
                        return <Radio key={index} /*handleChange={handleRadio}*/ id={entry.name} name={title} value={entry} text={<><span>{entry.name}</span>: {entry.description}</>} />
                    })
                } else console.log("object.entries: // ", Object.entries(item))
                // more stuff here
                
                return 'asdf'
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
//  expert: haven: [{name:'', description:''}...]
//  monsterous: curses: [{name: string, description: string} ...]
//              natural attcks: {slots, [{name: st, type: st, harm: num, tags:[{name: st, url: st}...]} ...]}
//  sp-slinger: combat magic: {bases: [{name: st, harm: num, tags:[etc]}...],  extras: [name: str, description: str]}
//  crooken: heat [string, string...]
//           underwold: [string, string...]


//  mundane: n/a
//  flake: none

//  chosen: fate {['string'], slots, ['string'], slots, ['string']}
//  wronged: who you lost: {who: [strings...], why: [strings...]}
//  divine: mission [string, string...]

//  initiate: sect {slots, ['string'], slots, ['string']}
//  professional: agency: {slots, [string, ...], ...}  
//  spooky: dark-side: {slots, [strings...]}


    return(
        <div>
            <h2>Specials Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}

        </div>
    )
}

export default Specials