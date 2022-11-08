

const initialState = {
 games : [],
 allgames:[],
 detail:[],
 genres:[]
};

function rootReducer (state = initialState , action ){
  switch(action.type){
    case "GET_ALL_GAMES":
      return{
        ...state,
        games:action.payload,
        allgames:action.payload
      }

      case "GET_BY_NAME":
        return{
          ...state,
          games: action.payload.length === 0 ? [{Error : "no videgames found"}] :action.payload
        }
      case "GET_BY_ID":
        return {
          ...state,
          detail:action.payload
        }

        case "GET_GENRES":
          return{
            ...state,
            genres:action.payload
          }

        case "FILTER_BY_GENRES":

         const allvgames = state.allgames; // me guardo el backup de todos los juegos 
         const genreFiter = action.payload === "Genres" ? allvgames : allvgames.filter(e=> e.genres.includes(action.payload))
          
         return{                     // aca pregunto si viene genres traeme todo si no filtrame unicamente los que coincidan con lo que mandaron 
           ...state,
           games: genreFiter   // devuelvo el filtro al del renderizado 

          }
          
        case "ORDER_BY_NAME":
           const sortGame = action.payload === "asc" || action.payload === "alpha"?
              
               state.games.sort((a,b)=>{

            if(a.name.toUpperCase() > b.name.toUpperCase()){
              return 1;
            }
            if(a.name.toUpperCase() < b.name.toUpperCase()){
              return -1;
            }
            return 0;
           }) : state.games.sort((a,b)=>{
            
            if(a.name.toUpperCase() > b.name.toUpperCase()){
              return -1;
          }
          if(a.name.toUpperCase() < b.name.toUpperCase()){
              return 1;
          }
          return 0;

      })

        return{
          ...state,
          games:sortGame

        }

      case "POST_GAME":
        return{
          ...state
        }



      case "ORDER_BY_RATING":
         const infoAll = state.games;
         
         let filtro = action.payload === "Hight" ? infoAll.sort((a,b)=>{
          
          if(a.rating > b.rating){
            return -1 ;
          }
          if(a.rating < b.rating){
            return 1 ;
           }
           return 0 
         }) : infoAll.sort((a,b)=>{
          if(a.rating > b.rating){
            return 1;
             }
          if(a.rating < b.rating){
            return -1;
          }
          return 0;
         })
        
            return{
         ...state,
          games:filtro
        }

        case "ORDER_BY_CREATED":
          let allVideoGames  = state.allgames;
          let info = action.payload === "Created" ? allVideoGames.filter(e => e.createInDb) : allVideoGames.filter(e=> !e.createInDb)  
        return{
         ...state,
         games: action.payload === "Games"? state.allgames : info 
          }
                
          case "CLEAN_DETAIL":
            return{
              ...state,
              detail:[]
            }
               
        
        

     default:
      return state
  }


}
















export default rootReducer;