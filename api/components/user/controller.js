const auth = require("../auth/controller");
const db = require("../../../store/remote-postgres");

const TABLE = "users";

function list(){
    return db.get(TABLE);
}

function get(id){
    return db.get(TABLE, id);
}

async function create(data){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!data.name || !data.username || !data.password) return Promise.reject(error)

    await auth.create(data.username, data.password).catch((e) => { return Promise.reject(e) });
    
    const dataUser = { name: data.name, username: data.username };
    return db.create(TABLE, dataUser);
}

async function follow(user, to){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!user || !to) return Promise.reject(error)
    
    const data = { user_from: String(user.id), user_to: String(to) }
    return db.create(TABLE + "_follow", data).catch((e) => { return Promise.reject(e) });
}

async function following(id){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!id) return Promise.reject(error)

    return db.query(TABLE + "_follow", { user_to: id }).catch((e) => { return Promise.reject(e) });
}

async function update(user, data){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!user || !data.name) return Promise.reject(error)

    const dataUser = { name: data.name, username: user.username };

    return db.update(TABLE, user.id, dataUser);
}

async function remove(user){
    const error = { message:"Error parameters", statusCode: 400 }
    if(!user) return Promise.reject(error)

    await db.remove(TABLE, user.id).catch((e) => { return Promise.reject(e) })
    return db.remove("auths", user.authId);
}


module.exports = {
    list,
    get,
    create, 
    follow,
    following,
    update,
    remove
}