import express from 'express';
import { registrarAsistencia } from '../controllers/asistenciaController.mjs';
import { authMiddleware } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/', authMiddleware, registrarAsistencia);

export default router;