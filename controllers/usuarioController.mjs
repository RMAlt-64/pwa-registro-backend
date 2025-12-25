import { Usuario } from "../models/index.mjs";

export const obtenerUsuarios = async (req, res) => {
    try {
        // findAll busca todos los registros en la tabla
        const usuarios = await Usuario.findAll({
            // Es buena práctica NO devolver la contraseña, aunque esté hasheada
            attributes: { exclude: ['password_hash'] }
        });

        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
};
