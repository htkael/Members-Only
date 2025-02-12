const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const validators = require("../middlewares/validations");
const registerValidation = validators.registerValidation;
const passport = require("passport");

exports.logInForm = async (req, res) => {
  res.render("login");
};

exports.getRegisterForm = async (req, res) => {
  res.render("register");
};

exports.registerUser = [
  registerValidation,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("register", {
          errors: errors.array(),
          formData: req.body,
        });
      }
      const full_name = req.body.full_name;
      const username = req.body.username;
      const membership_status = "basic";
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const { rows } = await db.addUser(
        full_name,
        username,
        hashedPassword,
        membership_status
      );
      const user = rows[0];

      await db.addUser(full_name, username, hashedPassword, membership_status);
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    } catch (error) {
      console.error("Could not add user", error);
      next(error);
    }
  },
];

exports.logIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
});

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
