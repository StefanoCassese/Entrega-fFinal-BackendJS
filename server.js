const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/productModel"); // Importar modelo de productos

// Inicializar la aplicación
const app = express();
console.log("Inicializando servidor...");

// Conexión a MongoDB
mongoose.connect(process.env.DATABASE_URL, {})
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((err) => {
        console.error("Error al conectar a MongoDB:", err.message);
        process.exit(1); // Termina la aplicación si la conexión falla
    });

// Configuración del motor de vistas Handlebars
console.log("Configurando Handlebars...");
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs", // Usa la extensión .hbs para las vistas
        defaultLayout: false, // Desactiva layouts globales
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // Ruta a la carpeta de vistas
console.log("Handlebars configurado.");

// Middleware para manejar archivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta principal para mostrar los productos
app.get("/", async (req, res) => {
    console.log("Accediendo a /...");
    try {
        const products = await Product.find().lean(); // Recuperar productos de la base de datos
        console.log("Productos recuperados:", products);
        res.render("home", { layout: false, title: "Lista de Productos", products });
    } catch (error) {
        console.error("Error al renderizar home.hbs:", error.message);
        res.status(500).send("Error en la página principal.");
    }
});

// Ruta para mostrar la vista del carrito
app.get("/cart", (req, res) => {
    console.log("Accediendo a /cart...");
    try {
        res.render("cart", { layout: false, title: "Carrito de Compras" });
    } catch (error) {
        console.error("Error al renderizar cart.hbs:", error.message);
        res.status(500).send("Error en la página del carrito.");
    }
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error("Middleware global de manejo de errores detectó un problema:", err.stack);
    res.status(500).send("Algo salió mal. Inténtalo más tarde.");
});

// Configuración del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));