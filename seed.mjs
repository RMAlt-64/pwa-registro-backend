import { sequelize, Usuario, Puesto, Asignacion } from './models/index.mjs';
import bcrypt from 'bcrypt';

const seed = async () => {
    try {
        // 1. Conectar y Sincronizar
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // CUIDADO: 'force: true' borra tablas y las recrea
        console.log('--- DB Reiniciada para la prueba ---');

        // 2. Crear un Administrador
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await Usuario.create({
            nombre: 'Carlos',
            apellido: 'Garcia',
            rol: 'administrador',
            DNI: '12345678',
            telefono: '31548698',
            fecha_nacimiento: '2000-1-15',
            email: 'carlos.admin@empresa.com',
            password_hash: adminPassword
        });

        // 3. Crear un Empleado
        const empPassword = await bcrypt.hash('user123', 10);
        const empleado = await Usuario.create({
            nombre: 'Juan',
            apellido: 'Pérez',
            rol: 'empleado',
            DNI: '87654321',
            telefono: '341546978',
            fecha_nacimiento: '1988-12-6',
            email: 'juan@empresa.com',
            password_hash: empPassword
        });

        // 4. Crear un Puesto (Asignándole el administrador)
        const puesto = await Puesto.create({
            nombre_puesto: 'Oficina Central',
            radio_validacion: 100,
            latitud: -34.6037, // Ejemplo: Buenos Aires
            longitud: -58.3816,
            administrador_id: admin.user_id, // Relación FK
            status: true
        });

        // 5. Crear la Asignación (Unir empleado con puesto)
        await Asignacion.create({
            personal_id: empleado.user_id,
            puesto_id: puesto.id_puesto,
            es_primario: true,
            fecha_inicio: new Date()
        });

        console.log('✅ Datos de prueba insertados con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error en el seeding:', error);
        process.exit(1);
    }
};

seed();