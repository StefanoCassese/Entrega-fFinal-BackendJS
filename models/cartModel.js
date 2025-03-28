const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true }, // Relación con Product
            cantidad: { type: Number, required: true, default: 1 } // Cantidad del producto
        }
    ],
    total: { type: Number, default: 0 }, // Total calculado automáticamente
}, {
    timestamps: true // Agrega campos de creación y actualización automática
});

module.exports = mongoose.model("Carrito", cartSchema);