const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);

    // Manejo de errores específicos
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Error de validación",
            message: err.message,
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Error en el formato de los datos",
            message: "El ID proporcionado no es válido.",
        });
    }

    // Error genérico del servidor
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message || "Ocurrió un error inesperado.",
    });
};

module.exports = errorHandler;