// Seleccionar elementos del DOM
const filterButtons = document.querySelectorAll(".btn-filter");
const productCards = document.querySelectorAll(".product-card");
const productList = document.getElementById("product-list");
const cartToggleButton = document.getElementById("toggle-cart");
const cartContainer = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const emptyCartButton = document.getElementById("empty-cart");
const checkoutButton = document.getElementById("checkout-cart");

// Estado del carrito
let cart = [];

// Función para renderizar el carrito
function renderCart() {
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
    let total = 0;

    // Iterar sobre los productos del carrito
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <p>${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}</p>
            <button class="btn btn-danger btn-remove-cart" data-id="${item._id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.precio * item.cantidad; // Multiplicar cantidad por precio
    });

    // Actualizar el total
    cartTotalSpan.textContent = total.toFixed(2);

    // Añadir eventos de eliminar producto
    document.querySelectorAll(".btn-remove-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            const product = cart.find(item => item._id === productId);

            if (product.cantidad > 1) {
                product.cantidad -= 1; // Reducir la cantidad si es mayor a 1
            } else {
                cart = cart.filter(item => item._id !== productId); // Eliminar completamente si la cantidad es 1
            }

            renderCart(); // Re-renderizar el carrito
        });
    });
}

// Evento para agregar productos al carrito
productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
        const productCard = e.target.closest(".product-card");
        const productId = productCard.getAttribute("data-id");
        const productName = productCard.querySelector(".card-title").textContent;
        const productPrice = parseFloat(productCard.querySelector(".card-text").textContent.replace("Precio: $", ""));

        // Buscar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item._id === productId);
        if (existingProduct) {
            existingProduct.cantidad += 1; // Incrementar la cantidad si ya existe
        } else {
            // Añadir el producto al carrito con cantidad inicial de 1
            const product = { _id: productId, nombre: productName, precio: productPrice, cantidad: 1 };
            cart.push(product);
        }

        // Mostrar alerta con SweetAlert
        Swal.fire({
            icon: "success",
            title: "Producto añadido",
            text: `"${productName}" se ha agregado al carrito.`,
            timer: 1500,
            showConfirmButton: false,
        });

        renderCart(); // Renderizar nuevamente el carrito
    }
});

// Evento para mostrar/ocultar el carrito
cartToggleButton.addEventListener("click", () => {
    if (cartContainer.style.display === "none" || !cartContainer.style.display) {
        cartContainer.style.display = "block"; // Mostrar el carrito
    } else {
        cartContainer.style.display = "none"; // Ocultar el carrito
    }
});

// Evento para vaciar el carrito
emptyCartButton.addEventListener("click", () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            text: "El carrito ya está vacío.",
        });
    } else {
        Swal.fire({
            icon: "question",
            title: "¿Estás seguro?",
            text: "Esto eliminará todos los productos del carrito.",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, vaciar carrito",
        }).then((result) => {
            if (result.isConfirmed) {
                cart = []; // Vaciar carrito
                renderCart(); // Renderizar nuevamente
                Swal.fire({
                    icon: "success",
                    title: "Carrito vacío",
                    text: "Todos los productos han sido eliminados.",
                });
            }
        });
    }
});

// Evento para finalizar la compra
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            text: "No hay productos en el carrito para finalizar la compra.",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "¡Compra realizada!",
            text: "Gracias por tu compra.",
        }).then(() => {
            cart = []; // Vaciar el carrito después de la compra
            renderCart(); // Renderizar nuevamente
        });
    }
});

