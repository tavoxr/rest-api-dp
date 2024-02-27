const express = require('express');
const crypto = require('node:crypto');
const z = require('zod'); //para validacion de datos para post, patch and put
const { validateMovie, validatePartialMovie } = require('./schemas/movies');
const cors = require('cors')

const app = express();

//Port
const PORT = process.env.PORT ?? 3000;

//Disable Headers
app.disable('x-powered-by');

//Middlewares
app.use(express.json());


//create server
app.get('/',(req,res)=>{
    res.json({message:"Hola Mundo"});    
})


const moviesJSON =require('./movies.json');

app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://localhost:123',
        'http://midudev'
      ]
  
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
  
      if (!origin) {
        return callback(null, true)
      }
  
      return callback(new Error('Not allowed by CORS'))
    }
  }));



//Rutas
//GET - all movies
app.get('/movies',(req,res)=>{

    const {genre} = req.query;
    if(genre){
        
        const filterMovies = moviesJSON.filter(
            //movie=> movie.genre.includes(genre)
            movie=> movie.genre.some(g=> g.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filterMovies);
    }

    res.json(moviesJSON);
});

//GET - MOVIE BY ID
app.get(`/movies/:id`,(req,res)=>{

    const {id} = req.params;
    console.log(req.params)

    const movie = moviesJSON.find(movie=> movie.id === id);
    if(movie) return res.json(movie);

    res.status(404).json({message: "Movie not found"});
});


//POST
app.post('/movies',(req,res)=>{

    const result = validateMovie(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const newMovie = {
        id: crypto.randomUUID(), //uuid v4
        ...result.data
    }

    moviesJSON.push(newMovie);

    res.status(201).json(newMovie); //actualizar la cache del cliente
})



//PATCH
app.patch('/movies/:id',(req,res)=>{

    const result = validatePartialMovie(req.body);

    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const {id} = req.params
    const movieIndex = moviesJSON.findIndex(movie=> movie.id === id);

    if(!movieIndex) return res.status(404).json({message: "Movie not found"})

    const updateMovie = {
        ...moviesJSON[movieIndex], 
        ...result.data
    }

    moviesJSON[movieIndex] = updateMovie

    return res.json(updateMovie);

    

});


//DELETE
app.delete('/movies/:id', (req,res)=>{

    const {id} = req.params;
    const movieIndex = moviesJSON.findIndex(movie => movie.id === id);

    if(movieIndex === -1){
        return res.status(404).json({message: "Movie not found"});
    }

    moviesJSON.splice(movieIndex,1);

    return res.json({message: "Movie Deleted"});

});



app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});


