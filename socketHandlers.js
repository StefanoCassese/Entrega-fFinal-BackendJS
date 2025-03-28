const Product = require("./models/productModel"); // Importar el modelo de productos

const socketHandlers = (io) => {
    io.on("connection", async (socket) => {
        console.log("Usuario conectado:", socket.id);

        // Emitir productos actuales al cliente cuando se conecta
        try {
            const products = await Product.find();
            socket.emit("updateProducts", products);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            socket.emit("updateProducts", []); // Enviar array vacío en caso de error
        }

        // Manejar la adición de nuevos productos
        socket.on("newProduct", async (productData) => {
            try {
                const newProduct = new Product(productData);
                await newProduct.save();
                console.log("Producto añadido:", newProduct);

                const products = await Product.find();
                io.emit("updateProducts", products); // Emitir productos actualizados
            } catch (error) {
                console.error("Error al añadir producto:", error);
            }
        });

        // Manejar la eliminación de productos
        socket.on("deleteProduct", async (productId) => {
            try {
                const deletedProduct = await Product.findByIdAndDelete(productId);
                if (deletedProduct) {
                    console.log("Producto eliminado:", deletedProduct);
                    const products = await Product.find();
                    io.emit("updateProducts", products); // Emitir productos actualizados
                } else {
                    console.error("Producto no encontrado para eliminar:", productId);
                }
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });

        // Desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Usuario desconectado:", socket.id);
        });
    });
};

module.exports = socketHandlers;