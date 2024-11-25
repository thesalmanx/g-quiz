const router = require("express").Router();

router.get("/status", (req, res) => {
  res.send("The API is working");
});

router.use("/users", require("./users"));

module.exports = router;
