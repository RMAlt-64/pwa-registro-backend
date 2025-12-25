import { DataTypes } from 'sequelize';
// Importamos la instancia de Sequelize configurada en config/database.mjs
import { sequelize } from '../config/database.mjs';

const Puestos = sequelize.define(
    'Puestos',
    {
        id_puesto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_puesto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        radio_validacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        latitud: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },
        longitud: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },
        administrador_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        tableName: 'puestos', // Forzamos el nombre de la tabla en minúsculas
        timestamps: true, // Sequelize manejará createdAt y updatedAt automáticamente
    },
);

export default Puestos;