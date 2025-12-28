
import { Puesto, Registro } from "../models/index.mjs";
import { calcularDistancia } from "../src/utils/geoUtils.mjs";


export const registrarAsistencia = async (req, res) => {
    try {
        const { id_puesto, lat_celular, lng_celular, tipo } = req.body;
        const personal_id = req.usuario.id;

        // 1. Buscamos el puesto para obtener su ubicación oficial
        const puesto = await Puesto.findByPk(id_puesto);
        if (!puesto) {
            return res.status(404).json({ error: "Puesto no encontrado" });
        }

        // 2. Calculamos la distancia real entre el celular y el puesto
        const distancia = calcularDistancia(
            parseFloat(lat_celular),
            parseFloat(lng_celular),
            parseFloat(puesto.latitud),
            parseFloat(puesto.longitud)
        );


        // 3. Determinamos si está fuera del radio permitido
        const esFueraDeRango = distancia > puesto.radio_validacion;

        // 4. Creamos el registro con la "etiqueta" de rango
        const nuevoRegistro = await Registro.create({
            personal_id,
            id_puesto,
            tipo,
            latitud_capturada: lat_celular,
            longitud_capturada: lng_celular,
            fuera_de_rango: esFueraDeRango, // Guardamos la evidencia
            distancia_metros: Math.round(distancia) // Opcional: guardar a qué distancia estaba
        });

        // 5. Respuesta informativa
        res.status(201).json({
            mensaje: esFueraDeRango
                ? "Registro completado (Fuera de rango detectado)"
                : "Registro completado exitosamente",
            fuera_de_rango: esFueraDeRango,
            distancia: Math.round(distancia),
            data: nuevoRegistro
        });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar el registro" });
    }
};