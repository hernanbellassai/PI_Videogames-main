import React from 'react';
import img from "../img/game.jpg";
import "../styles/carta.css";


function Card({name,image,genres,rating}) {
  var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;

  return (
    <div className='cardContainer'>
      
      
      <img className='cardImg' src={regexUrl.test(image) ? image : img} alt="File Not Found" width="250px" height="200px" />
      
       <div className='textContainer'>
     
          <div className='nameContainer'>
           <h3 className='cardName' style={{textDecoration:"none"}} >{name}</h3>
          </div>
    

           <div className='genreContainer'>
           <h5 className='cardGenre'>{ genres.join(" | ")}</h5>
           </div>

           <div className='raitingContainer'>
           <h3 className='cardRating'>{rating}</h3>
           </div>

       </div>

    

      
      






    </div>
  )
}

export default Card