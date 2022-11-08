import axios from "axios";



  export function allGames (){
    
    return async function(dispatch){
      let info = await axios.get("http://localhost:3001/games");

      return dispatch({
        type:"GET_ALL_GAMES",
        payload : info.data
      })
    }
        

  }

  export function getName (name){

   return async function (dispatch){
    let info = await axios.get(`http://localhost:3001/games?name=${name}`);
    console.log(info)
    
    return dispatch({
      type:"GET_BY_NAME",
      payload: info.data
    })    
   }


  }
export function getId (id){

  return async function (dispatch){
   let info = await axios.get(`http://localhost:3001/games/${id}`)
  console.log(info)
  
   return dispatch({
    type:"GET_BY_ID",
    payload:info.data
   })
  }
}  

export const orderBy= (payload) =>{

  return{
    type:"ORDER_BY",
    payload:payload,
  };

   
}


export function getGenres(){
  return async function (dispatch){
    let info = await axios.get("http://localhost:3001/genres");

    return dispatch({
      type:"GET_GENRES",
      payload: info.data
    })
   

  }
}

export function postGames (payload){
  return async function (dispatch){
    let info = await axios.post("http://localhost:3001/create",payload);
  
  
  return info;
   
  
  }


}

export function filterByGenres (payload){

  return {
    type:"FILTER_BY_GENRES",
    payload
  }
}

export function orderByName (payload){
  return {
    type:"ORDER_BY_NAME",
    payload
  }
}  

export function orderByRating (payload){
  return {
    type:"ORDER_BY_RATING",
    payload
  }
}  
  
export function orderByCreated (payload){
  return {
    type:"ORDER_BY_CREATED",
    payload
  }
}  

export function detail (){
   return{
    type:"CLEAN_DETAIL"
   }
}

