import React, {useEffect} from 'react'

const Gear = (props) => {

    const path = `/playbooks/${props.match.params.playbook}`
    useEffect(() => {props.apiOrigin != path ?  props.apiCall(path) : console.log('already loaded')}, [])
    
    let gearArr = null

    const loading = () => {return 'Loading...'}

    const loaded = () => {
        gearArr = Object.values(props.apiData.gear)
        return(
            gearArr.map((x, index) => {
                if (props.newChar.path === 'initiate') {
                    return( 'initiate')
                } else if (props.newChar.path === 'wronged' && index === 0) {return x.name

                } else if (props.newChar.path === 'wronged' && index === 1) {
                    return (x.map((vehicle,index) => {return <h4>{vehicle}</h4>}))

                } else if (index%2 === 0) {return <h3 key={index} >Choose {x}</h3>
                
                } else {return (x.map((z, index) => {
                    if (typeof z === 'object') {
                        let tag = z.tags.map(tag => tag.name).toString()
                        return (
                            <h4 key={index} >{z.name}, harm:{z.harm}{tag !== "" ? `, tags: ${tag}` : null}</h4>
                        )
                    } else if (typeof z === 'string') {
                        return <h4>{z}</h4>
                    }
                }))}
            })
        )
    }

    return(
        <div>
            <h2>Gear Componenet</h2>
            {props.apiOrigin === path ? loaded() : loading()}
        </div>
    )
}

export default Gear