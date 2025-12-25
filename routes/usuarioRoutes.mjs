import express from 'express';
import { obtenerUsuarios } from '../controllers/usuarioController.mjs';
import { authMiddleware } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Ruta: GET /
// Protegida por authMiddleware: solo usuarios con Token válido pueden ver esto
router.get('/', authMiddleware, obtenerUsuarios);

export default router;
