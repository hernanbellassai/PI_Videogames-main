const { Router } = require('express');
const axios = require("axios");
const {infoApi,byName,getAll,allId,getDbInfo} = require("./funciones")
const {Videogame,Genres} = require("../db.js")
// const {API_KEY} = require(".env")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


//const API_KEY = "key=df842e2ebd5649b3b3f2489270fee95f";





router.get("/games",async(req,res)=>{   //listo aca tengo la ruta games que trae todo y tambien por nombre 

  let {name}=req.query;

  let infoTotal = await getAll();
  
  // console.log("soy info",infoTotal);

try{
   if(name){

        const nombre = await byName(name);
        const infoName = await getDbInfo();
         const infoDb = infoName.filter(e=>e.name.toLowerCase().includes(e.name.toLowerCase()))
        let infoAll = infoDb.concat(nombre)
       res.status(200).send(infoAll); 
       
    }else if(!name){
      
      let data = await getAll();
   
      res.status(200).send(data);
   
    }else{
      res.status(404);
    }
    
  }catch(error){
     
    return res.status(404).json({error:"el juego no existe"})
  }

});

 
 

 

router.get("/games/:id", async(req,res)=>{
 
const {id} = req.params;
  
let dato = await allId(id);

if(dato){
  
  return res.send(dato) 
}else{
  res.status(404).send("no se encontro dicho Id");
}
});

   



router.get("/genres",async(req,res)=>{
  try{
    let genres =  await axios.get("https://api.rawg.io/api/genres?key=df842e2ebd5649b3b3f2489270fee95f");

  let resultado = await genres.data.results.map(e=> e.name); // en resultado  me guardo cada nombre de genero 
 

  resultado.map(e=> Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
    where: {name : e}
  }))
  
   const allGenres = await Genres.findAll();
       res.json(allGenres);


  }catch(e){
   console.log(e)
  }
  

})


  
    router.post("/create", async (req,res) =>{
      const {  name, image, description, released, rating, genres, platforms } = req.body;
      console.log(req.body);
     try{ 
      
      let newVideogame = await Videogame.create({
          
          name,
          description,
          image,
          released,
          rating,
          platforms,
        })
         
      let findGenres = await Genres.findAll({
        where: {name: genres }
      });
      
      newVideogame.addGenres(findGenres);
      res.send("VideoGame Created Successfully")
      //res.send(newVideogame)
      
  }catch(error){
      console.log(error)
      console.log("Error en la ruta de Post")
  }  });
  
   
   











    router.get("/holis",(req,res)=>{
   const {name}=req.query
  if(name){
    res.send("holis")
  }
     res.status(404).send("no se encontro bro ")
})


   
 










// router.get("/videogames", async(req,res)=>{
//    try{    
//   let {name} = req.query;

//   let videoGamesName = axios.get(`https://api.rawg.io/api/games?search=${name}&key=df842e2ebd5649b3b3f2489270fee95f`)
      
//       if(name){

//         let videoNames = videoGamesName.data.results.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
       
//         let videosName = videoNames.map(e=>{
//         return { id: e.id,
//           image: e.background_image,
//           name: e.name,
//           released: e.released,
//           rating: e.rating,
//           platforms : e.platforms.map(e=> e.platform.name),
//           genres:e.genres.map(e=>e.name),
//           description: e.description,}
          
//         })

//         res.status(200).send(videoGamesName);
//       }else{

//       }
      
     
  
//      let info = await GetAllapi();

//      res.send(info);   
// }catch(error){
//   console.log(error)
// }
//   })
   

// router.get("/game", async(req,res)=>{
//    let {name} = req.query;

//   if(name){
//     res.send(names(name))
//    }

//   res.send("sory bro")

// });

   

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
