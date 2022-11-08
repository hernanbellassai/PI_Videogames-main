import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getId } from '../actions';
import image from "../img/game.jpg";

import Detail from "../styles/Detail.css";


function Game() {
  
  
  let dispatch = useDispatch();
  let {id}=useParams();


  let details =useSelector(state=>state.detail)

  useEffect(()=>{
   dispatch(getId(id))
  },[])
  
  
  return (
    <>


      <div className='firstContainer' key={details.id}>
           
         <div className='detailContainer'>
           
           <img className="gameImg "src= {details.image? details.image : image} alt="" width="580px"  height="400px"/>

            <div className="gameDetail">
           
            <h1>{details.name}</h1>
            <p> <strong> {details.released}</strong></p>

            {/* cuando mapeo a genres de la api entro sin name y cuando mapeo a genres de base de datos entro con name */}
            
            <div className='detailPlatform' ><strong>Platforms : </strong> {details.platforms?.map(e => <div key={e}> {"--" + e  }</div>)} </div>
            <p ><strong>Genre:</strong>{details.genres?.map(e => e).join(", ")}</p>
            <div><strong>Sinopsis: </strong>{<p dangerouslySetInnerHTML={{__html: details.description}}></p>}</div>
            <div  className="ratingDetail"> <strong> Rating:</strong> <p className='ratingDetails'>{details.rating}</p> </div>
            </div>

        </div>

      </div>

      
    
    
    
    </>
     

  )
}

export default Game