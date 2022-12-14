require("dotenv").config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    dbConnection: process.env.DB_CONNECTION,
    dbServicePort: process.env.DB_SRV_PORT,
    jwtKey: process.env.JWT_KEY
}

module.exports = config;