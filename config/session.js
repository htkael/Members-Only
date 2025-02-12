const pool = require("../db/pool");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const sessionConfig = (app) => {
  app.use(
    session({
      store: new pgSession({
        pool: pool,
        tableName: "session",
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      },
    })
  );
};

module.exports = sessionConfig;
