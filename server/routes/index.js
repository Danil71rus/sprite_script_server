const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

const routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/zip", controller.download);
  router.get("/compress-file", controller.onCompressFiles);

  app.use(router);
};

module.exports = routes;
