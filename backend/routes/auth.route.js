import express from 'express';
import dotenv from 'dotenv';
import { signup, login } from '../controller/member.controller.js';

dotenv.config();
const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);

export default authRouter;
