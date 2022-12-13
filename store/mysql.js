const mysql = require("mysql");
const config = require("../config");

const pool = mysql.createPool(config.connectionString);

pool.getConnection((err,connection)=> {
    if(err) {
        console.log("[ERROR DB]", err);
        return;
    }
    console.log('Database connected successfully');
    connection.release();
});


function getItem(table, id = null){
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${table}`;
        if(id !== null) query += ` WHERE id = ${id}` ;

        pool.query(query, (err, data) => {
            if(err) reject(err);
            resolve(data);
        });   
    });
}

function createItem(table, data){
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${table} SET ?`;
        pool.query(query, [data], (err, data) => {
            if(err) reject(err);
            resolve(data);
        });   
    });
}

function updateItem(table, id, data){
    return new Promise((resolve, reject) => {
        let query = `UPDATE ${table} SET ? WHERE id = ?`;

        pool.query(query, [data, id], (err, data) => {
            if(err) reject(err);
            resolve(data);
        });   
    });
}

function deleteItem(table, id){
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM ${table} WHERE id = ?`;

        pool.query(query, id, (err, data) => {
            if(err) reject(err);
            resolve(data);
        });   
    });
}

function query(table, query){
    return new Promise((resolve, reject) => {
        let fullQuery = `SELECT * FROM ${table} WHERE ?`;
        pool.query(fullQuery, query, (err, data) => {
            if(err) reject(err);
            resolve(data);
        });   
    });
}

module.exports = {
    get: getItem, 
    create: createItem,
    update: updateItem,
    delete: deleteItem,
    query: query
}