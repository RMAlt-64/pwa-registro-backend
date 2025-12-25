import { Usuario } from "../models/index.mjs";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};