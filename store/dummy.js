let db = {
    "user":[
        { id: "0", name: "Carlos" },
        { id: "1", name: "Maria" },
        { id: "2", name: "Juan" },
    ],
    "auth": []
};

async function list(table){
    return db[table];
} 

async function get(table, id){
    const col = await list(table);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data){
    const count = String(Object.keys(db.user).length);

    db[table].push({
        id: count,
        ...data
    });
}

async function remove(table, id){
    const col = await list(table);
    let items = col.filter(item => item.id !== id);

    db = {
        ...db,
        "user": items
    }
    return db.user;
}

async function query(table, query){
    const col = await list(table);
    const key = Object.keys(query)[0];
    return col.filter(item => item[key] === query[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}