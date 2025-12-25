
import { Puesto, Registro } from "../models/index.mjs";
import { calcularDistancia } from "../utils/geoUtils.mjs";


export const registrarAsistencia = async (req, res) => {
    try {
        const { id_puesto, lat_celular, lng_celular, tipo } = req.body;
        const personal_id = req.usuario.id;

        const puesto = await Puesto.findByPk(id_puesto);
        if (!puesto) {
            return res.status(404).json({ error: "Puesto no encontrado" });
        }

        // Calculamos la distancia
        const distancia = calcularDistancia(lat_celular, lng_celular, puesto.latitud, puesto.longitud);

        // Definimos si está fuera de rango
        const esFueraDeRango = distancia > puesto.radio_validacion;

        // Guardamos el registro IGUALMENTE
        const nuevoRegistro = await Registro.create({
            personal_id,
            id_puesto,
            tipo,
            latitud_capturada: lat_celular,
            longitud_capturada: lng_celular,
            fuera_de_rango: esFueraDeRango, // Guardamos la evidencia
            distancia_metros: Math.round(distancia) // Opcional: guardar a qué distancia estaba
        });

        // Respondemos con un mensaje personalizado
        if (esFueraDeRango) {
            return res.status(201).json({
                mensaje: "Registro guardado, pero se detectó que estás fuera del rango permitido.",
                advertencia: true,
                data: nuevoRegistro
            });
        }

        res.status(201).json({ mensaje: "Registro exitoso en el lugar correcto.", data: nuevoRegistro });

    } catch (error) {
        res.status(500).json({ error: "Error al registrar" });
    }
};