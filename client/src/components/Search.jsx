import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions';
import "../styles/search.css";

function Search() {
 
 let dispatch = useDispatch()



 let [search, setSearch] = useState();


console.log(search)

function handleClick(e){                           //f  desp validar
  e.preventDefault();
  if(search){
    dispatch(getName(search)) ///como un boludo le pasaba el e y no el search entonces siempre buscaba otra cosa 
  }
}
  


  
 
 
function handleChange(e){
  e.preventDefault();
  setSearch(e.target.value)   // seteo e valor del search con lo que ponga en el input 
 
}
 
  return (
    <> 
    
      <div className='search'>
    
       <input 
       type="text"
       className='searchInput'
       placeholder='Search'
       onChange={handleChange}
       value={search}
       autoComplete="off"
       />
    
                                       {/* le paso una funcion on click a button para enviaar lo que cambie en el estado de input  */}

       <button className='searchBtn' type='SearchButton' onClick={handleClick}>Search</button> 
             
       </div>
    
    
    </>
  )
}

export default Search