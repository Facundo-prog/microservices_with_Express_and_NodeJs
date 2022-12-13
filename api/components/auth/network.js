const express = require("express");
const response = require("../../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get("/", login);

function login(req, res, next) {
    controller.login(req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => {
        next(e);
    });
}

module.exports = router;