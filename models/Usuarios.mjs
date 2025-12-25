import { DataTypes } from 'sequelize';
// Importamos la instancia de Sequelize configurada en config/database.mjs
import { sequelize } from '../config/database.mjs';

const Usuario = sequelize.define(
    'Usuario',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(30),
            // allowNull por defecto es true
        },
        rol: {
            type: DataTypes.ENUM('empleado', 'administrador'),
            allowNull: false,
            defaultValue: 'empleado',
        },
        DNI: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validación integrada de Sequelize
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
        // NOTA: fecha_creacion y fecha_actualizacion se generan automáticamente con timestamps: true
    },
    {
        tableName: 'usuarios', // Nombre de la tabla en la BD
        timestamps: true,      // Crea automáticamente createdAt y updatedAt
    }
);

export default Usuario;