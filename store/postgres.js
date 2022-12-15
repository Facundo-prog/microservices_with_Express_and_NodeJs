const pg = require("pg").Pool;
const config = require("../config");

const pool = new pg({ connectionString: config.dbConnection });

pool.connect((err,connection)=> {
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
            if(err) return reject(err);
            resolve(data.rows);
        });   
    });
}

function createItem(table, data){
    return new Promise((resolve, reject) => {
        let queryColumns = "";
        let queryValues = "";

        data.columns.forEach((element, index) => {
            queryColumns += element;
            queryValues += `'${data.values[index]}'`;

            if(index !== data.columns.length - 1){
                queryColumns += ", ";
                queryValues += ", ";
            }
        })

        const query = `INSERT INTO ${table}(${queryColumns}) VALUES(${queryValues})`

        pool.query(query, (err, data) => {
            if(err) return reject(err);
            resolve(data.rows);
        });
    });
}

function updateItem(table, id, data){
    return new Promise((resolve, reject) => {
        let query = `UPDATE ${table} SET `;

        data.columns.forEach((element, index) => {
            query += `${element} = '${data.values[index]}'`

            if(index !== data.columns.length - 1){
                query += ", ";
            }
        })

        query += " WHERE id = $1";

        pool.query(query, [id], (err, data) => {
            if(err) return reject(err);
            resolve(data.rows);
        });
    });
}

function deleteItem(table, id){
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM ${table} WHERE id = $1`;

        pool.query(query, [id], (err, data) => {
            if(err) return reject(err);
            resolve(data.rows);
        });   
    });
}

function query(table, query){
    return new Promise((resolve, reject) => {
        let fullQuery = `SELECT * FROM ${table} WHERE `;

        query.columns.forEach((element, index) => {
            fullQuery += `${element} = '${query.values[index]}'`

            if(index !== query.columns.length - 1){
                fullQuery += " && ";
            }
        })

        pool.query(fullQuery, (err, data) => {
            if(err) return reject(err);
            resolve(data.rows);
        })
    });
}

module.exports = {
    get: getItem, 
    create: createItem,
    update: updateItem,
    delete: deleteItem,
    query: query
}