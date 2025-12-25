import express from 'express';
import { loginController } from '../controllers/loginController.mjs';

const router = express.Router();

// Definimos la ruta POST /login
// Cuando alguien visite esta ruta, se ejecutará el loginController
router.post('/login', loginController);

export default router;
