const jwt = require("../../../cryptography/jwt");
const crypto = require("../../../cryptography/crypto");
const db = require("../../../store/remote-postgres");

const TABLE = "auths";


async function login(data){
    const error = { message: "Unauthorized", statusCode: 401 }
    if(!data.username || !data.password) return Promise.reject(error);
    let user;

    const query = {
        columns: ["username"],
        values: [data.username]
    }
    const result = await db.query(TABLE, query).catch((e) => {
        return Promise.reject(e);
    });

    if(Object.keys(result.body).length <= 0) return Promise.reject(error);
    user = result.body[0];

    const password = await crypto.verifyPassword(data.password, user.password);
    if(!password) return Promise.reject(error);

    return jwt.newToken({ id: user.id });
} 

async function create(username, password){
    const error = { message:"Unauthorized", statusCode: 401 }
    if(!username || !password) return Promise.reject(error);

    const passwordHash = await crypto.passwordHash(password);
    const data = { 
        columns: ["username", "password"],
        values: [username, passwordHash]
    };

    return db.create(TABLE, data);
}


module.exports = {
    login,
    create
}