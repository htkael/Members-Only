const { Router } = require("express");
const homepageRouter = Router();
const indexController = require("../controllers/indexController");
const homepageController = require("../controllers/homepageController");

homepageRouter.get(
  "/",
  indexController.isAuthenticated,
  homepageController.homePage
);
homepageRouter.get("/logout", homepageController.logOut);
homepageRouter.get(
  "/message",
  indexController.isAuthenticated,
  homepageController.getMessageForm
);
homepageRouter.post(
  "/message",
  indexController.isAuthenticated,
  homepageController.sendMessage
);
homepageRouter.post(
  "/verify-passcode",
  indexController.isAuthenticated,
  homepageController.verifyPasscode
);
homepageRouter.post(
  "/verify-admin",
  indexController.isAuthenticated,
  homepageController.checkAdmin
);
homepageRouter.post("/delete/:id", homepageController.deleteMessage);

module.exports = homepageRouter;
