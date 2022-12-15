const db = require("../../../store/remote-postgres");

const TABLE = "posts";

function list(){
    return db.get(TABLE);
}

function get(id){
    const query = {
        columns: ["id"],
        values: [id]
    }
    return db.query(TABLE, query);
}

async function create(user, data){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!data.text) return Promise.reject(error)
    
    const dataPost = {
        columns: ["user_id", "text"],
        values: [user.id, data.text]
    }
    return db.create(TABLE, dataPost);
}

async function update(user, id, data){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!user || !id || !data.text) return Promise.reject(error)

    const post = await db.get(TABLE, id).catch((e) => { return Promise.reject(e) })
    if(Object.keys(post.body).length <= 0) return Promise.reject({ message:"Post not exist", statusCode: 404 })
    if(parseInt(post.body[0].user_id) !== parseInt(user.id)) return Promise.reject({ message:"User is not the creator", statusCode: 401 })

    const query = {
        columns: ["text"],
        values: [data.text]
    }
    return db.update(TABLE, id, query);
}

async function remove(user, id){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!user || !id) return Promise.reject(error)

    const post = await db.get(TABLE, id).catch((e) => { return Promise.reject(e) })
    if(Object.keys(post.body).length <= 0) return Promise.reject({ message:"Post not exist", statusCode: 404 })
    if(parseInt(post.body[0].user_id) !== parseInt(user.id)) return Promise.reject({ message:"User is not the creator", statusCode: 401 })

    return db.remove(TABLE, id);
}


module.exports = {
    list,
    get,
    create,
    update,
    remove
}