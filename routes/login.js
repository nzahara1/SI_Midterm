var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var userDB = require("../utilities/userDB.js");

/**
 * @swagger
 * /login:
 *  get:
 *    description: This route logs in the user.
 *    produces: html
 *    responses:
 *      'details.ejs':
 *        description: A successful response
 */
router.get("/", function(req, res) {
  if (
    req.session.userProfile &&
    userDB.isUserValid(req.session.userProfile._userDetails)
  ) {
    res.redirect("/course-details");
  } else {
    req.session.userProfile = userDB.getRandromUserForLogin();
    req.session.theCourse = []
    res.redirect("/");
  }
});

module.exports = router;
