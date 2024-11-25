const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const utils = require("../lib/utils");

router.get("/protected", utils.authMiddleware, (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
});

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res
          .status(200)
          .json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            user: user,
          });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Register a new user
router.post("/register", async (req, res, next) => {
  const { username, email, firstname, lastname, password } = req.body;

  try {
    // Check if the username already exists
    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });

    if (existingUsername) {
      // If user exists, send a response indicating the user already exists
      return res
        .status(400)
        .json({ success: false, msg: "Username already exists." });
    }
    if (existingEmail) {
      // If user exists, send a response indicating the user already exists
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists." });
    }

    const saltHash = utils.genPassword(password);

    console.log("username is: ", username);
    console.log("password is: ", password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      hash: hash,
      salt: salt,
    });

    // Save the new user
    const user = await newUser.save();
    res.json({ success: true, user: user });
  } catch (err) {
    // Handle errors during user creation
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error." });
  }
});

// Your routes here
router.get("/success", utils.authMiddleware, async (req, res) => {
  const username = req.jwt.username; // Use the authenticated user's username

  try {
    // Find the user in the database using the username from the JWT
    const user = await User.findOne({ username: username });

    if (user) {
      res.status(200).json({
        message: "User login successful",
        user: {
          displayName: user.displayName,
          email: user.email,
          image: user.image,
          username: user.username,
        },
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
