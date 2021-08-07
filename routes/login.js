const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/register");
const validate = require("../utils/validate");
const router = express.Router();
const { schema } = require("../models/login");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email/password.");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid email/password.");
    const token = user.generateAuthToken();
    res.json({ token: token, email: user.email });
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error.message);
  }
});

module.exports = router;
