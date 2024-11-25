const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load .env file

const pathToKey = path.join(__dirname, ".", "id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, ".", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

const express = require("express");
const cors = require("cors");
const utils = require("./lib/utils");

const PORT = process.env.PORT || 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("./models/user");

var app = express();
app.use(cors());

require("./config/database");

require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

// Fetch secrets from .env
const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;

if (!clientid || !clientsecret || !sessionSecret) {
  console.error("Missing required environment variables. Please check .env file.");
  process.exit(1);
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails[0].value;
          const username = email.split("@")[0];

          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: email,
            image: profile.photos[0].value,
            username: username,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initial Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_LOGIN_URL || "http://localhost:3000/login",
  }),
  (req, res) => {
    const tokenObject = utils.issueJWT(req.user);
    const username = req.user.username;
    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:3000"}?token=${encodeURIComponent(
        tokenObject.token
      )}&expires=${encodeURIComponent(tokenObject.expires)}&username=${encodeURIComponent(
        username
      )}`
    );
  }
);

app.get("/auth/google/success", (req, res) => {
  if (req.isAuthenticated()) {
    const tokenObject = utils.issueJWT(req.user);
    res.status(200).json({
      message: "User login successful",
      user: req.user,
    });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/issue", (req, res) => {
  if (req.user) {
    const tokenObject = utils.issueJWT(req.user);
    console.log("tokenObject: ", tokenObject);
  }

  try {
    const tokenParts = req.headers.authorization.split(" ");

    if (
      tokenParts[0] === "Bearer" &&
      tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
    ) {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      return res
        .status(200)
        .json({ success: true, msg: `Status: ${verification}` });
    }

    // If token is not properly formatted
    res.status(400).json({ success: false, msg: "Invalid token format" });
  } catch (err) {
    // If verification fails
    res.status(401).json({
      success: false,
      msg: "You are not authorized to visit this route",
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL || "http://localhost:3000/");
});

// Server listens on specified PORT
app.listen(PORT, function () {
  console.log(`Server started on http://localhost:${PORT}`);
});
