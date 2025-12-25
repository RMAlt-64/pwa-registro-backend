import { DataTypes } from 'sequelize';
// Importamos la instancia de Sequelize configurada en config/database.mjs
import { sequelize } from '../config/database.mjs';

const Registro = sequelize.define(
    'Registro',
    {
        registro_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timestamp_registro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        latitud_capturada: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        longitud_capturada: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        id_puesto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('entrada', 'salida'),
            allowNull: false,
        },
        fuera_de_rango: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        distancia_metros: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'registros', // Forzamos el nombre de la tabla en minúsculas
        timestamps: false,      // No necesitamos updatedAt porque un registro no se edita
    }
);

export default Registro;
