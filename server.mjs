import express from 'express'; // 1. Importar Express
// import { createServer } from 'node:http'; <--- Ya no es necesario

const app = express(); // 2. Crear la instancia de la aplicación
const port = 3000;

// 3. Añadir Middleware (¡Fundamental!)
app.use(express.json()); // Permite a Express leer JSON en peticiones POST

// 4. Definir Rutas (Endpoint de Prueba)
app.get('/', (req, res) => {
    res.status(200).send('¡Servidor Express listo para la API!');
});

// 5. Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor Express corriendo en http://localhost:${port}/`);
});