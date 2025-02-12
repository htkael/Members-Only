const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const homepageRouter = require("./homepageRouter");

indexRouter.use("/", homepageRouter);
indexRouter.get("/register", indexController.getRegisterForm);
indexRouter.post("/register", indexController.registerUser);
indexRouter.get("/login", indexController.logInForm);
indexRouter.post("/login", indexController.logIn);

module.exports = indexRouter;
