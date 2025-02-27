// const { Sequelize } = require("sequelize");
// const { db } = require("../config/config"); // Importamos la configuración de la BD

// // Instanciar sequelize para conectar a MySQL
// const sequelize = new Sequelize(db.name, db.user, db.password, {
//   host: db.host,
//   port: db.port,
//   dialect: "mysql",
//   logging: (msg) => {
//     if (msg.includes("ERROR")) {
//       console.error("Error de Sequelize:", msg);
//     }
//   },
// });

// // Probar la conexión
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Conexión exitosa a la base de datos MySQL");
//   } catch (error) {
//     console.error("❌ Error de conexión a la base de datos:", error);
//   }
// })();

// module.exports = sequelize; // Exportar la instancia de Sequelize
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Host del servidor MySQL
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para evitar problemas de certificados SSL en Railway
      },
    },
  }
);

// 🔍 Verificar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
  }
})();

module.exports = sequelize;
