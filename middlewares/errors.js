const response = require("../network/response");

module.exports = (err, req, res, next) => {
    console.log("[ERROR]", err);
    response.error(req, res, err.message, err.statusCode);
}