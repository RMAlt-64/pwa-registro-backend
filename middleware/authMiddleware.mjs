import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // 2. Verificar el token usando la clave secreta del .env
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('FATAL ERROR: JWT_SECRET is not defined in .env');
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const decoded = jwt.verify(token, secret);

        // 3. Guardar los datos del usuario en la request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
