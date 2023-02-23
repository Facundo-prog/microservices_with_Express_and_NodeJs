const fetch = require("node-fetch");

function createRemoteDB(host, port){
    const URL = `${host}:${port}`;

    function get(table, id = null){
        return req("GET", table, id);
    }

    function create(table, data){
        return req("POST", table, null, data);
    }

    function update(table, id, data){
        return req("PATCH", table, id, data);
    }

    function remove(table, id){
        return req("DELETE", table, id);
    }

    function query(table, query){
        return req("POST", table + "/query", null, query);
    }


    async function req(method, table, id = null, data = null){
        let url = `${URL}/microservices-db/v1/${table}`;
        let args = {
            method,
            body: null,
            headers: {'Content-Type': 'application/json'}
        }

        if(method === "GET" && data){
            url += `/${data}`;
        }
        else if(data){
            args.body = JSON.stringify(data);
        }

        if(id){
            url += `/${id}`;
        }

        const response = await fetch(url, args).catch((err) => {
            console.error("ERROR remote DB", err);
            return Promise.reject(err)
        })
        return await response.json();
    }

    return {
        get,
        create, 
        update,
        remove,
        query
    }
}

module.exports = createRemoteDB;