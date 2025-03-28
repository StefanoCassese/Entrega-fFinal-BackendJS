const express = require("express");
const router = express.Router();
const Product = require("../models/productModel"); // Importar modelo de productos

// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Recuperar productos desde la BD
        res.status(200).json(products); // Enviar productos en formato JSON
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ error: "Error al obtener productos." });
    }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body); // Crear nuevo producto
        await newProduct.save(); // Guardar producto en la BD
        res.status(201).json(newProduct); // Enviar el producto creado
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
        res.status(500).json({ error: "Error al agregar producto." });
    }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retornar el producto actualizado
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        res.status(500).json({ error: "Error al actualizar producto." });
    }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado." });
        }
        res.status(200).json(deletedProduct); // Enviar el producto eliminado
    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        res.status(500).json({ error: "Error al eliminar producto." });
    }
});

module.exports = router;