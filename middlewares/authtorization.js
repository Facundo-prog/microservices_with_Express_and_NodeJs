const jwt = require("../cryptography/jwt");
const response = require("../network/response");
const db = require("../store/remote-mysql");

module.exports = async function checkUser(req, res, next){
    const token = req.headers.authorization;
    const result = jwt.verifyToken(String(token).substring(7));
    
    if(!result){
        response.error(req, res, null, 401);
        return;
    }

    try{
        const userAuth = await db.get("auths", result.id).catch((e) => { return response.error(req, res) })
        if(Object.keys(userAuth.body).length <= 0) return response.error(req, res, null, 401)
        
        const user = await db.query("users", { username: userAuth.body[0].username }).catch((e) => { return response.error(req, res) })
        if(Object.keys(user.body).length <= 0) return response.error(req, res, null, 401)
        
        req.user = {
            ...user.body[0],
            authId: result.id,
            password: userAuth.body[0].password
        }

        next();

    } catch {
        return response.error(req, res, null, 401);
    }
}