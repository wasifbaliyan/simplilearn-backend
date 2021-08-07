const mongooose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongooose;
const Joi = require("joi");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    "myPrivateKey"
  );

  return token;
};

const User = mongooose.model("User", userSchema);

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
module.exports = { User, schema };
