import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Importa dotenv de forma directa para módulos ES

// 1. Obtener las variables del .env
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// 2. Crear la instancia de Sequelize
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'postgres', // Especifica el motor de BD
        logging: false, // Puedes poner 'console.log' para ver las consultas SQL
        port: 5432 // Puerto estándar de PostgreSQL
    }
);

// 3. Función para probar la conexión
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
        process.exit(1); // Detiene el proceso si no puede conectar
    }
}

// Exporta la instancia y la función para usarlas en el servidor
export { sequelize, connectDB };