const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    displayName: { type: String },

    googleId: { type: String },
    image: { type: String },

    hash: { type: String },
    salt: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
