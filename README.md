# Entrega-Final-BackendJS

Este proyecto es una tienda en línea para productos deportivos. Incluye un backend desarrollado con Node.js, Express y MongoDB, junto con funcionalidades completas para gestionar productos, un carrito de compras y filtros por categorías.
Características Principales

#Requisitos

#Instalación
Sigue estos pasos para instalar y ejecutar el proyecto en tu computadora:

#Clonar el Repositorio
git clone https://github.com/StefanoCassese/Entrega-fFinal-BackendJS.git
cd Entrega-fFinal-BackendJS

#Instalar Dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto: npm install

#Importar la Base de Datos
1.Ve a la carpeta BD
2. Usa el siguiente comando para importar los datos en MongoDB:mongoimport --db miProyecto --collection productos --file DB/miProyecto.productos.json --jsonArray
#Ejecutar el Proyecto
Inicia el servidor con el siguiente comando: npm start

#Estructura del Proyecto
├── BD/
│   ├── productos.json          # Archivo con datos iniciales de la base de datos
├── public/                     # Archivos estáticos (CSS, imágenes)
├── routes/                     # Definición de rutas del backend
├── views/                      # Plantillas de vistas (Handlebars)
├── socketHandlers.js           # Funciones para manejar eventos de sockets
├── app.js                      # Configuración y ejecución del servidor
├── package.json                # Dependencias del proyecto
└── README.md                   # Documentación del proyecto
