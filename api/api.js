const express = require("express");
const config = require("../config");
const userRouter = require("./components/user/network"); 
const authRouter = require("./components/auth/network");
const postRouter = require("./components/post/network");
const errorMiddleware = require("../middlewares/errors");

const app = express();

app.use(express.json());

const routerApi = express.Router();
app.use("/api/v1", routerApi);
routerApi.use("/users", userRouter);
routerApi.use("/auth", authRouter);
routerApi.use("/posts", postRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("API REST con node")    
})

app.listen(config.port, () => {
    console.log("API listen in " + config.host + ":" + config.port);
});