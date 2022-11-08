import React from 'react'

function GenreSelectOption({allGenres}) {
  
  

  return (
    
    <div>
    {
     allGenres?.map(e=>{
      
      return(
         
         <option key={e.id} value={e.name}>
           {
           e.name
           }
         </option>
      )
     })

}
    </div>
  )
}

export default GenreSelectOption