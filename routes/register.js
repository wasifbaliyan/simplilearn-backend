const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const validate = require("../utils/validate");

const { User, schema } = require("../models/register");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
    const foundUser = await User.find({ email: req.body.email });
    if (foundUser.length != 0) {
      return res.status(400).send({ message: "Handle already taken." });
    } else {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = user.generateAuthToken();

      res.json({ token: token, email: user.email });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
    console.log(error.message);
  }
});

module.exports = router;
