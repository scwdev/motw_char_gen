import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {
    
    return(
        <nav>
            <Link to='/playbooks'>
                Playbooks
            </Link>
            <Link to={`/${props.newChar.path}/moves`}>
                Moves
            </Link>
            <Link to={`/${props.newChar.path}/ratings`}>
                Ratings
            </Link>
            <Link to={`/${props.newChar.path}/gear`}>
                Gear
            </Link>
            {/* <Link>
                
            </Link> */}
        </nav>
    )
}

export default Nav