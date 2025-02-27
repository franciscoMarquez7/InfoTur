// // Importar libreria para manejo de ficheros de configuración
// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// });
// // Importar fichero de configuración con variables de entorno
// const config = require("./config/config");
// // Importar librería express --> web server
// const express = require("express");
// // Importar librería path, para manejar rutas de ficheros en el servidor
// const path = require("path");
// // Importar libreria CORS
// const cors = require("cors");
// // Importar gestores de rutas
// const ciudadRoutes = require("./routes/ciudadRoutes");
// const monumentoRoutes = require("./routes/monumentoRoutes");

// const app = express();

// // Configurar middleware para analizar JSON en las solicitudes
// app.use(express.json());

// // Configurar CORS para admitir cualquier origen
// app.use(cors()); // No permitiría el envío de cookies

// // Configurar CORS para admitir el origen del frontend en desarrollo
// // app.use(
// //   cors({
// //     //origin: "http://localhost:5173",

// //     origin: "http://localhost:8081",

// //     credentials: true, // Permitir envío de cookies
// //   })
// // );

// // Configurar rutas de la API Rest
// app.use("/api/ciudades", ciudadRoutes);
// app.use("/api/monumentos", monumentoRoutes);

// // Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
// app.use(express.static(path.join(__dirname, "public")));


// //Ruta para manejar las solicitudes al archivo index.html
// // app.get('/', (req, res) => {
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // En lugar de app.listen directamente
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(config.port, () => {
//     console.log(`Servidor escuchando en el puerto ${config.port}`);
//   });
// }

// module.exports = { app };

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const config = require("./config/config");
const express = require("express");
const cors = require("cors");
const path = require("path");

const ciudadRoutes = require("./routes/ciudadRoutes");
const monumentoRoutes = require("./routes/monumentoRoutes");

const app = express();

app.use(express.json());

// 🔥 Configurar CORS correctamente
app.use(
  cors({
    origin: "https://infotur-production.up.railway.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Configurar rutas
app.use("/api/ciudades", ciudadRoutes);
app.use("/api/monumentos", monumentoRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor en el puerto correcto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { app };
