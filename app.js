import express, { json } from 'express';
 //para validacion de datos para post, patch and put
//import moviesJSON from './movies.json' with {type: 'json'}; //Esta sintaxis ya no existe para assert ahora es con with pero aun no ha salido oficialmente //para indicar ES6 Modules que el archivo que se va  exportar es un archivo tipo json esto porque a diferencia de commonJS no esta en la especificacion oficial el exportar json de esta forma asi ES6 ya sabe que tipo es porque aun es experimental
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';




const app = express();
app.disable('x-powered-by'); //Disable Headers

//Middlewares
app.use(json());
app.use(corsMiddleware());



//Rutas
app.use('/movies',moviesRouter);



//Port
const PORT = process.env.PORT ?? 3000;

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});


