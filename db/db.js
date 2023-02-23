const express = require("express");
const config = require("../config");
const storeRouter = require("./network");
const errorMiddleware = require("../middlewares/errors");

const app = express();

app.use(express.json());

const apiRouter = express.Router();
app.use("/microservices-db/v1", apiRouter);
apiRouter.use("/", storeRouter);

app.use(errorMiddleware);

app.listen(config.dbServicePort, () => {
    console.log("DB listen in " + config.host + ":" + config.dbServicePort);
});