const router = require("express").Router();
const verify = require("../middleWares/verifyToken");

router.get("/privateInfo", verify, (req, res) => {
  res.send("Access Granted");
});

module.exports = router;
