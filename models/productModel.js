const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Nombre del producto
    precio: { type: Number, required: true }, // Precio del producto
    categoria: { type: String }, // Categoría del producto
    disponible: { type: Boolean, default: true }, // Disponibilidad
    imagen: { type: String, required: true }, // Imagen en Base64
}, {
    timestamps: true // Agrega campos de creación y actualización automática
});

module.exports = mongoose.model("Producto", productSchema);