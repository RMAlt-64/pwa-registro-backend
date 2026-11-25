import express from 'express';
import cors from 'cors';
// Importa la configuración y la función de conexión
import { connectDB } from './config/database.mjs';
import { syncModels } from './models/index.mjs';
import authRoutes from './routes/authRoutes.mjs';
import usuarioRoutes from './routes/usuarioRoutes.mjs';
import registroRoutes from './routes/registroRoutes.mjs';



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware esencial
app.use(express.json());

// Configuración de CORS dinámica usando la variable de entorno
const corsOptions = {
  origin: process.env.CORS_ORIGIN, 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Función de inicio que ahora incluirá la conexión a la DB
async function startServer() {
    // 1. Intentar conectar a la DB
    await connectDB();

    // 2. Sincronizar modelos
    await syncModels();

    // 3. Rutas de la API
    app.use('/api/auth', authRoutes);
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/registros', registroRoutes);

    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}/`);
    });
}

startServer();