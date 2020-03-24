var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var userDB = require("../utilities/userDB.js");

/**
 *This route logs in the user.
 */
router.get("/", function(req, res) {
  if (
    req.session.userProfile &&
    userDB.isUserValid(req.session.userProfile._userDetails)
  ) {
    res.redirect("/courseDetails");
  } else {
    req.session.userProfile = userDB.getRandromUserForLogin();
    res.redirect("/");
  }
});

module.exports = router;
