import React from 'react';
import { Link, Route } from 'react-router-dom';
import "../styles/landing.css";
import Home from './Home';


function Landing() {
  return (
    <div id='landing'>

    <Link to="/home">
      <button>Start</button>
    </Link>


    </div>
  )
}

export default Landing