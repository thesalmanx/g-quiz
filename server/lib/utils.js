const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

/**
 *
 @param {*} password - The plain text password
  @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;
  const username = user.username;
  const expiresIn = "1d";

  const payload = {
    sub: _id, // subject (user ID)
    username: username, // Include the username in the payload
    iat: Math.floor(Date.now() / 1000), // issued at time
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
    user: username,
  };
}

function authMiddleware(req, res, next) {
  const tokenParts = req.headers.authorization.split(" ");
  // console.log(tokenParts);
  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      req.jwt = verification;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        msg: "You are not authorized to visit this route",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      msg: "You are not authorized to visit this route",
    });
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
