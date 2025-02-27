const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  port: process.env.PORT || 3000,
db: {
  name: process.env.DB_NAME || 'ciudad_monumento',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'test',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
},
secretKey: process.env.SECRET_KEY || "default_secret"

};
console.log("DBNAME:",process.env.DB_NAME);
console.log("DBHOST:",process.env.DB_HOST);
console.log("DBUSER:",process.env.DB_USER);
console.log("DBPORT:",process.env.DB_PORT);
console.log("NODE_ENV:",process.env.NODE_ENV);
