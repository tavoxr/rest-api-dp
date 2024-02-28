import { Router } from "express";
import { MovieController } from "../controllers/movie.js";

export const moviesRouter = Router();


//Get all movies
moviesRouter.get('/',MovieController.getAll);

//Get movie by id
moviesRouter.get('/:id',MovieController.getById);

//Create movie
moviesRouter.post('/',MovieController.create);

//Update movie
moviesRouter.patch('/:id',MovieController.update);

//Delete movie
moviesRouter.delete('/:id',MovieController.delete);


