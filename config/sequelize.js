const { Sequelize } = require("sequelize");
const { db } = require("../config/config"); // Importamos la configuración de la BD

// Instanciar sequelize para conectar a MySQL
const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: "mysql",
  logging: (msg) => {
    if (msg.includes("ERROR")) {
      console.error("Error de Sequelize:", msg);
    }
  },
});

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos MySQL");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
  }
})();

module.exports = sequelize; // Exportar la instancia de Sequelize