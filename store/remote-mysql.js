const remote = require("../store/remote");
const config = require("../config");

module.exports = new remote(config.host, config.mysqlServicePort);