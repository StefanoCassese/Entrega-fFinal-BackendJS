const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel"); // Importar modelo de carrito (si existe)
const Product = require("../models/productModel"); // Importar modelo de productos

// Obtener el contenido del carrito
router.get("/", async (req, res) => {
    try {
        const cart = await Cart.find(); // Recuperar carrito desde la BD
        res.status(200).json(cart); // Enviar carrito en formato JSON
    } catch (error) {
        console.error("Error al obtener carrito:", error.message);
        res.status(500).json({ error: "Error al obtener carrito." });
    }
});

// Agregar un producto al carrito
router.post("/", async (req, res) => {
    try {
        const { productId } = req.body; // ID del producto a agregar
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }

        const cartItem = { product: productId, cantidad: 1 }; // Estructura del producto en el carrito
        const updatedCart = await Cart.findOneAndUpdate(
            {}, // Asume un único carrito (puedes modificar si hay múltiples carritos)
            { $push: { items: cartItem } },
            { new: true, upsert: true } // Crear carrito si no existe
        );
        res.status(200).json(updatedCart); // Enviar carrito actualizado
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error.message);
        res.status(500).json({ error: "Error al agregar producto al carrito." });
    }
});

// Eliminar un producto del carrito
router.delete("/:productId", async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {}, // Asume un único carrito
            { $pull: { items: { product: req.params.productId } } },
            { new: true } // Retornar carrito actualizado
        );
        if (!updatedCart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }
        res.status(200).json(updatedCart); // Enviar carrito actualizado
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error.message);
        res.status(500).json({ error: "Error al eliminar producto del carrito." });
    }
});

module.exports = router;