require("dotenv").config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    connectionString: process.env.MYSQL_CONNECTION,
    mysqlServicePort: process.env.MYSQL_SRV_PORT,
    jwtKey: process.env.JWT_KEY
}

module.exports = config;