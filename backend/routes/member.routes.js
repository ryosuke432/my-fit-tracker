import express from 'express';
import { addNutrition, addWorkout, deleteNutrition, deleteProfile, deleteWorkout, updateNutrition, updateProfile, updateWorkout, verifyToken, viewAllNutrition, viewAllWorkout, viewNutrition, viewProfile, viewWorkout } from '../controller/member.controller.js';

const memberRouter = express.Router();

// Sole entity
// retrieve a specific member profile
memberRouter.get('/profile', verifyToken, viewProfile);

// update a specific member profile
memberRouter.put('/profile', verifyToken, updateProfile);

// delete a specific member
memberRouter.delete('/profile', verifyToken, deleteProfile);

// Entities Interaction

// Workout interaction
// add workout of a specific member
memberRouter.post('/workout', verifyToken, addWorkout);

// retrieve all workouts of a specific member
memberRouter.get('/workout', verifyToken, viewAllWorkout);

// retrieve specific workout of a specific member
memberRouter.get('/workout/:id', verifyToken, viewWorkout);

// edit specific workout of a specific member
memberRouter.put('/workout/:id', verifyToken, updateWorkout);

// delete a specific workout of a specific member
memberRouter.delete('/workout/:id', verifyToken, deleteWorkout);

// Nutrition interaction
// add nutrition of a specific member
memberRouter.post('/nutrition', verifyToken, addNutrition);

// retrieve all nutrition of a specific member
memberRouter.get('/nutrition', verifyToken, viewAllNutrition);

// retrieve specific nutrition of a specific member
memberRouter.get('/nutrition/:id', verifyToken, viewNutrition);

// edit specific nutrition of a specific member
memberRouter.put('/nutrition/:id', verifyToken, updateNutrition);

// delete specific nutrition of a specific member
memberRouter.delete('/nutrition/:id', verifyToken, deleteNutrition);



export default memberRouter;
