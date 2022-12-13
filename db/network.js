const express = require("express");
const response = require("../network/response");
const store = require("../store/mysql");

const router = express.Router();

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", create);
router.post("/:table/query", query);
router.patch("/:table/:id", update);
router.delete("/:table/:id", remove);

function list(req, res, next) {
    store.get(req.params.table).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function get(req, res, next){
    store.get(req.params.table, req.params.id).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function create(req, res, next){
    store.create(req.params.table, req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function update(req, res, next){
    store.update(req.params.table, req.params.id, req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function remove(req, res, next){
    store.delete(req.params.table, req.params.id).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

function query(req, res, next){
    store.query(req.params.table, req.body).then((result) => {
        response.success(req, res, result);
    }).catch((e) => next(e));
}

module.exports = router;