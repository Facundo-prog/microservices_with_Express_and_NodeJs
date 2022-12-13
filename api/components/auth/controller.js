const jwt = require("../../../cryptography/jwt");
const crypto = require("../../../cryptography/crypto");
const db = require("../../../store/remote-mysql");

const TABLE = "auths";


async function login(data){
    const error = { message: "Unauthorized", statusCode: 401 }
    if(!data.username || !data.password) return Promise.reject(error);
    let user;

    await db.query(TABLE, { username: data.username }).then((result) => {
        user = result.body[0];
    }).catch((e) => {
        return Promise.reject(e);
    });

    if(!user) return Promise.reject(error);

    const password = await crypto.verifyPassword(data.password, user.password);
    if(!password) return Promise.reject(error);

    return jwt.newToken({ id: user.id });
} 

async function create(username, password){
    const error = { message:"Unauthorized", statusCode: 401 }
    if(!username || !password) return Promise.reject(error);

    const passwordHash = await crypto.passwordHash(password);
    const data = { username: username, password: passwordHash };

    return db.create(TABLE, data);
}


module.exports = {
    login,
    create
}