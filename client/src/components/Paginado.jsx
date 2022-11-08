import React from 'react'
import  "../styles/paginacion.css";

function Paginado({gamesPerPage,games,paginado,}) {
    
    const pageNumber = [];

    for (let i = 1 ; i<=Math.ceil(games/gamesPerPage); i++){
         
      pageNumber.push(i);
    }
 
  return (
    <>

         <nav>
            
            <ul  className="paginadoUl">
              { 
              pageNumber?.map(number =>{
                return(
                  <li className="paginadoLi" key={number}>
                <button className="paginadoBtn" onClick={()=>paginado(number)} >{number}  </button> 
                  </li>
                )
                 
              })}
            </ul>
           
        </nav>


    
    </>
  )
}

export default Paginado