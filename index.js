// Importar libreria para manejo de ficheros de configuración
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const ciudadRoutes = require("./routes/ciudadRoutes");
const monumentoRoutes = require("./routes/monumentoRoutes");

const app = express();

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

app.use(cors({
  origin: ['https://infotur-production.up.railway.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400
}));

// Middleware adicional para asegurar headers CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Configurar rutas de la API Rest
app.use("/api/ciudades", ciudadRoutes);
app.use("/api/monumentos", monumentoRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
app.use(express.static(path.join(__dirname, "public")));


//Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// En lugar de app.listen directamente
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}

module.exports = { app };
