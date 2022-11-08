import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div>
      <Link to={"/home"}>
        <button>try this!</button>
      </Link>
     <h1> 404 Error</h1>

      </div>
  )
}

export default Error