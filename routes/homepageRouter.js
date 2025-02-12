const { Router } = require("express");
const homepageRouter = Router();
const indexController = require("../controllers/indexController");
const homepageController = require("../controllers/homepageController");

homepageRouter.get(
  "/",
  indexController.isAuthenticated,
  homepageController.homePage
);

module.exports = homepageRouter;
