const db = require("../db/queries");
require("dotenv").config();

exports.homePage = async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.render("homepage", { user: req.user, messages: messages });
  } catch (error) {
    console.error("Error retrieving homepage", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logOut = async (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      // Move the redirect inside the callback
      res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });
      res.redirect("/login");
    });
  });
};

exports.getMessageForm = async (req, res) => {
  try {
    res.render("message");
  } catch (error) {
    console.error("Error retrieving message form", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.user.id;
    await db.sendMessage(title, content, user_id);
    res.redirect("/");
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.verifyPasscode = async (req, res) => {
  const { passcode } = req.body;
  const id = req.user.id;
  console.log(passcode, process.env.MEMBER_PASSCODE);

  if (passcode === process.env.MEMBER_PASSCODE) {
    try {
      await db.updateStatus(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
};
exports.checkAdmin = async (req, res) => {
  const { passcode } = req.body;
  const id = req.user.id;

  if (passcode === process.env.ADMIN_PASSCODE) {
    try {
      await db.updateAdminStatus(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
};

exports.deleteMessage = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await db.deleteMessage(id);
  res.redirect("/");
};
