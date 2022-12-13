const { hash, compare } = require("bcrypt");

async function passwordHash(data){
    return await hash(data, 10);
}

async function verifyPassword(data, hash){
    return await compare(data, hash);
}

module.exports = { passwordHash, verifyPassword }