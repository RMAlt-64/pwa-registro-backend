import { DataTypes } from 'sequelize';
// Importamos la instancia de Sequelize configurada en config/database.mjs
import { sequelize } from '../config/database.mjs';

const Asignacion = sequelize.define(
    'Asignacion',
    {
        asignacion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        puesto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        es_primario: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        fecha_asignacion: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        tableName: 'asignaciones', // Nombre de la tabla en la BD
        timestamps: true,      // Crea automáticamente createdAt y updatedAt
        indexes: [
            {
                unique: true,
                fields: ['personal_id', 'puesto_id'] // Una persona solo puede ser asignada una vez a un puesto.
            }
        ]
    }
);

export default Asignacion;