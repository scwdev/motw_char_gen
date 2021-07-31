import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {
    
    return(
        <nav>
            <Link to='/playbooks' onClick={props.apiCall}>
                Playbooks
            </Link>
            <Link to={`/${props.newChar.path}/moves`} onClick={props.apiCall}>
                Moves
            </Link>
            <Link to={`/${props.newChar.path}/ratings`} onClick={props.apiCall}>
                Ratings
            </Link>
            {/* <Link>
                
            </Link> */}
        </nav>
    )
}

export default Nav