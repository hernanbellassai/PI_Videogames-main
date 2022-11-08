const axios = require('axios');
const {Videogame,Genres} =require("../db");




const infoApi = async() => {
  let url = `https://api.rawg.io/api/games?key=df842e2ebd5649b3b3f2489270fee95f`
  let videojuegos = []
  try {
      for(let i=0; i<5; i++) { //con un for recorro mi API, ya que es un arreglo, 5 veces
          const respuesta = await axios.get(url) //realizo la peticion
          //en mi .data podemos encontrar dos propiedades, results que es es aquello que voy a mapear
           respuesta.data.results.map(v => { //a la respuesta/resultado lo mapeo
              videojuegos.push({ //y pusheo en mi array vacio todo aquello que mapee
                  id: v.id,
                  name: v.name,
                  image: v.background_image,
                  rating: v.rating,
                  platforms: v.platforms?.map(e => e.platform.name),
                  genres: v.genres?.map(e => e.name)
              })
          });
          //y next que es donde voy a entrar para pasar a la siguente pagina.
          url = respuesta.data.next
      }
      return videojuegos

  } catch(e) {
      console.log(e)
  }
};


////////////////////////////////////////////////////////////
const getDbInfo = async ()=> {
  let infoDb = await Videogame.findAll({
      include: {
          model: Genres,    // va a buscar en el modelo Genres 
          attributes:["name"], // el que machee con el atributo del name ej GTA
          through: {
              attributes: [],
          },
      },
  });
  
 // retorno los datos necesarios para los juegos de la DB
   infoDb = infoDb.map(({ createInDb, id, name, released, rating, platforms, genres, image }) => ({ 
    createInDb,
    id,
    name,
    released,
    rating,
    platforms,
    image,
    genres: genres.map((e) => e.name),
    
  }));
  return infoDb
};





/////////////////////////////////////////////////////
const getAll = async()=>{

  const apiData = await infoApi(); // meto en una variable todo lo d api
const dbData = await getDbInfo();   // todo lo de database
const allInfo = apiData.concat(dbData);  // aca en una constante concateno y guardo todo lo de base de datos y api

  
  return allInfo;  //retorno tola da info concatenada 
}



const byName = async (name)=>{
  
   let videoGamesName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=df842e2ebd5649b3b3f2489270fee95f`)
  //  console.log(videoGamesName);



   let videosName = videoGamesName.data.results.map(e=>{


    
    return { id: e.id,
      image: e.background_image,
      name: e.name,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms.map(e=> e.platform.name),
      genres: e.genres.map(e=> e.name),
      description: e.description,}
      
    })

 return videosName;
}


const byId = async (id) => {
   
  const info = await axios.get(`https://api.rawg.io/api/games/${id}?key=df842e2ebd5649b3b3f2489270fee95f`)
  
   try {
      
    if(info){
      const newinfo = await info.data; // le engancho el .data
        
      const datoFinal =
      {

       id: newinfo.id,
     name : newinfo.name,
     image: newinfo.background_image,
     rating: newinfo.rating,
     genres: newinfo.genres.map(e => e.name),
     released: newinfo.released,
     description: newinfo.description,
     platforms: newinfo.platforms.map(e=> e.platform.name),

      }

     return datoFinal;
     } else {

    return ("No existe un juego con ese id")
     }
   
   }catch(e){
     console.log(e)
   }
   }


const idDb = async (id) => {
  try {
  return await Videogame.findByPk(id, {
      include: [{
          model: Genres, 
          atributes: ['name'], 
          throught: { 
              attributes: [] 
          }
      }]
     })
  } catch(e) {
      console.error(e)
  }
}


const allId = async(id)=>{   //
  
  if(id.length > 9){
    const datoDbid = await idDb(id);
  
    const objJs = JSON.parse(JSON.stringify(datoDbid));
    console.log(objJs)
  
    const datoFinal =
    {
     id: objJs.id,
   name : objJs.name,
   image: objJs.background_image,
   genres: objJs.genres.map(e => e.name),
   rating: objJs.rating,
   released: objJs.released,
   description: objJs.description,
   platforms: objJs.platforms,
    }
   console.log(datoFinal)

    return datoFinal;
  
    
  


                                  // aca si incu algun simbolo busca directo en la bd  por si esta buscando el creado
       }else{                              //sino que busque en la api 
    const datoApi = await byId(id);
    return datoApi;
}
};





























//terminar dellete

// const deleteGame = async (name) => {     
//   if (!name) {
//     throw "Es necesario el nombre para borrar el juego";
//   } else {
//     const deletedGame = await Videogame.destroy({
//       where: {
//         name: name,
//       },      
//     });
//     return "Juego borrado con exito";
//   }
// };


module.exports={
getDbInfo,byName,infoApi,getAll,byId,allId
}