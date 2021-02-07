const ip = require('ip');
const cors = require("cors");
const express = require("express");
const history = require('connect-history-api-fallback');
const path = require("path");
const config = require("./my.config");
const util = require("./server/util");



const hostname = ip.address();
const port = config.serverFile.port;
const dirProject = config.serverFile.dirProject;
global.__basedir = __dirname;

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname, dirProject));

util.createUploidDir();

const corsOptions = {
    origin: `http://${hostname}:${config.client.port}`,
};
const initRoutes = require("./server/routes");
initRoutes(app);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(history());
app.use(staticFileMiddleware);

//app.listen(port, hostname, () => {
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

