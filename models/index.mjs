import { sequelize } from '../config/database.mjs';

// 1. Importar todos los modelos
import Usuario from './Usuarios.mjs';
import Puesto from './Puestos.mjs';
import Asignacion from './Asignacion.mjs';
import Registro from './Registro.mjs';

// -----------------------------------------------------------
// 2. Definir las Relaciones (Asociaciones)
// -----------------------------------------------------------

// --- Relación Administrador -> Puestos (1:N) ---
// Un usuario (admin) puede gestionar muchos puestos.
Usuario.hasMany(Puesto, { foreignKey: 'administrador_id', as: 'puestos_administrados' });
Puesto.belongsTo(Usuario, { foreignKey: 'administrador_id', as: 'administrador' });

// --- Relación Personal -> Registros (1:N) ---
// Un usuario tiene muchos registros de entrada/salida.
Usuario.hasMany(Registro, { foreignKey: 'personal_id', as: 'mis_registros' });
Registro.belongsTo(Usuario, { foreignKey: 'personal_id', as: 'empleado' });

// --- Relación Puesto -> Registros (1:N) ---
// En un puesto se realizan muchos registros de diferentes personas.
Puesto.hasMany(Registro, { foreignKey: 'id_puesto', as: 'registros_en_puesto' });
Registro.belongsTo(Puesto, { foreignKey: 'id_puesto', as: 'puesto' });

// --- Relación MUCHOS A MUCHOS (Usuarios <-> Puestos) ---
// Aquí es donde manejamos que un empleado pueda tener 1, 2 o más puestos asignados.
Usuario.belongsToMany(Puesto, {
    through: Asignacion,
    foreignKey: 'personal_id',
    otherKey: 'puesto_id',
    as: 'puestos_permitidos'
});

Puesto.belongsToMany(Usuario, {
    through: Asignacion,
    foreignKey: 'puesto_id',
    otherKey: 'personal_id',
    as: 'personal_autorizado'
});

// -----------------------------------------------------------
// 3. Función de Sincronización
// -----------------------------------------------------------

const syncModels = async () => {
    try {
        // 'alter: true' actualiza las tablas existentes sin borrar los datos (ideal para desarrollo)
        await sequelize.sync({ alter: true });
        console.log('✅ Base de datos sincronizada y relaciones establecidas.');
    } catch (error) {
        console.error('❌ Error al sincronizar la base de datos:', error);
    }
};

// 4. Exportar todo para usarlo en el resto de la App
export {
    sequelize,
    Usuario,
    Puesto,
    Asignacion,
    Registro,
    syncModels
};