import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {allGames , orderByName,getGenres,filterByGenres,orderByRating,orderByCreated, detail} from "../actions";
import Card from '../components/Card';
import Search from "../components/Search"
import { Link } from 'react-router-dom';
import Paginado from "../components/Paginado";


import GenreSelectOption from '../components/GenreSelectOption'; //no funciono !
import  "../styles/Home.css";


function Home() {
  
  
  const dispatch = useDispatch();

  const games = useSelector(state=> state.games);// me traigo el estado de redux donde estan todos los juegos
  const allGenres = useSelector(state=> state.genres); // el estado de genres 
  
  //////////////////// PAGINADO///////////////////
  const [currentPage , setCurrentPage] = useState(1); 
  const [gamesPerPage , setGamesPerPage] =useState(15) // cuatos games por pagina 
  
  const indexOfLastGame = currentPage * gamesPerPage; //15 
  const indexOffFirstGame = indexOfLastGame - gamesPerPage;//  juegos por pagina 15 - indice del ultimo 15  ==== 0 

  const currentGames = games.slice(indexOffFirstGame,indexOfLastGame)


  const [orden, setOrden]= useState("")
   console.log(orden)

  const paginado =(pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  
  useEffect(()=>{
  dispatch(allGames());
  dispatch(getGenres());   
  

  },[dispatch])  // siempre y cuando suceda eso ej el dispatch 
   
  const handleClick =(e)=>{
   e.preventDefault();
   dispatch(allGames())
   
  };

 const handleSort=(e)=>{ 
 e.preventDefault();
 dispatch(orderByName(e.target.value)); // aca despacho la accion de ordenar alpha con el value asc o des
 setCurrentPage(1);
 setOrden(`Ordenado ${e.target.value}`);
 }

 const handleSortByRating=(e)=>{
 e.preventDefault();
 dispatch(orderByRating(e.target.value));
 setOrden(`Ordenado ${e.target.value}`);
 }
 const handleFilterCreated=(e)=>{
  e.preventDefault();
dispatch(orderByCreated(e.target.value));
 }

 const handleFilterGenres=(e)=>{

  dispatch(filterByGenres(e.target.value))
  
 }



// const setTime = ()=>{
//   if(allGenres.length === 0){
//     <h1>Loading...</h1>
//     setTimeout(300)
//   }
// }  
  return (
    <>
    <div className='home-container'>

                <div className='up'>
                     <div className='reload-container'>
                     <button className='reload' onClick={e =>{handleClick(e)}}>Reload VideoGames</button>
                     </div>
                              <div className='search'>
                                 <Search/>
                                 </div>
                              
                              <div className='button'>
                             <Link to = "/addgame">
                             <button className='buttonn'>Create Game</button> 
                            </Link>  
                            </div>

                          
       
              </div>
            
                                 <div className='titulo'>
                                  
                                  <div className='tituloo'>GAMES</div>
                                  
                                  </div>
       
        <div className='filtros-grande'>
                <div className='fitro-alpha'>
                        
                        
                        <select className='alpha' onChange={e => handleSort(e)}>
                            <option value="alpha">Alphabetic Sort</option>
                            <option value="asc">Sort:  A - Z</option>
                            <option value="des">Sort:  Z - A</option>
                        
                        </select> 
                    

                       

                        
                        <select  className='rating' onChange={ e => handleSortByRating(e)} >
                            <option value="Rating">Rating</option>
                            <option value="Hight">Hight Rating</option>
                            <option value="Low">Low Rating</option>
                        </select>
                        

                        
                        <select className='allgames' onChange={e => handleFilterCreated(e)}>
                            <option value="Games">All Games</option>
                            <option value="api">Games Api</option>
                            <option value="Created">Created</option>
                        </select>
                       
            
            

                        
                       <select  className='genres' onChange={e => handleFilterGenres(e)}>
                            <option value="Genres"> All Genres </option>
                         {
                           allGenres?.map(e=>{
                            return(
                              <option key={e.id} value={e.name} >
                                {e.name}
                              </option>
                            )
                           })

                         }
                {/* <GenreSelectOption allGenres={allGenres} /> */}
                        </select>

                        
           
            </div>
        </div>
           
            
            
            
                        



   

    
         



      <div className='paginado'>
       <Paginado gamesPerPage={gamesPerPage} games={games.length} paginado={paginado}/>
     </div>    
   
       <div className='homeCardContainer'>
        
              { currentGames.length ? 
                currentGames?.map(e=>{
                   return (   //si el return no renderiza 
                       e.Error? <h3 >VideoGame No Existe</h3>:   //si no encunetra que mande este mensaje y sino que renderise dichas cards 
                <div className='homeCard' key={e.id}>
                             <Link  style={{textDecoration:"none"}}    to={"/game/"+ e.id}>
                        <Card  name={e.name} image={e.image} genres={e.genres} rating={e.rating} />
                            </Link>
                 </div>
               )
     
                 })
                   : <div className='loading'>
                           
                                  

                           
                          
                                  <h1> Loading...</h1>
                          
                         
                         
                         </div>
                }
  
                </div> 
                   
                   
                 <br /> <br />

                   <div className='down'> 
                     
                   <footer>
                        <h5>HERNAN BELLASSAI</h5>

                    </footer>

                </div>
                   
               
          </div>
    </>
 
 )
}

export default Home