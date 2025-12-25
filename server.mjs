import express from 'express';
// Importa la configuración y la función de conexión
import { connectDB } from './config/database.mjs';
import { syncModels } from './models/index.mjs';
import authRoutes from './routes/authRoutes.mjs';
import usuarioRoutes from './routes/usuarioRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware esencial
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.status(200).send('API de Registro de Personal Activa.');
});

// Función de inicio que ahora incluirá la conexión a la DB
async function startServer() {
    // 1. Intentar conectar a la DB
    await connectDB();

    // 2. Sincronizar modelos
    await syncModels();

    // 3. Rutas de la API
    app.use('/api/auth', authRoutes);
    app.use('/api/usuarios', usuarioRoutes);

    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}/`);
    });
}

startServer();