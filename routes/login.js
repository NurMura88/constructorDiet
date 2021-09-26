const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("partials/login");
});
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.email = email;
      if (email === "admin@admin.ru") {
        req.session.admin = email;
      }
      return res.redirect("/constructor");
    } else {
      res.sendStatus(418);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(418);
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
