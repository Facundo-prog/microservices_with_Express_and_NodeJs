const express = require("express");
const response = require("../../../network/response");
const controller = require("./controller");
const checkUser = require("../../../middlewares/authtorization");

const router = express.Router();

router.get("/", list);
router.get("/:id", checkUser, get);
router.get("/:id/following", checkUser, following);
router.patch("/", checkUser, update);
router.post("/", checkUser, create);
router.post("/follow/:id", checkUser, follow);
router.delete("/",checkUser, remove);

function list(req, res, next) {
    controller.list().then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function create(req, res, next){
    controller.create(req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function follow(req, res, next){
    controller.follow(req.user, req.params.id).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function following(req, res, next){
    controller.following(req.params.id).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function get(req, res, next){
    controller.get(req.params.id).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function update(req, res, next){
    controller.update(req.user, req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function remove(req, res, next){
    controller.remove(req.user).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

module.exports = router;