import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'

const Main = () => {
    return (
        <Link to='/playbooks'>
            <Button handleClick={()=>{}} text="Get Started" />
        </Link>
       )
}

export default Main