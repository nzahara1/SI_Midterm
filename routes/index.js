var express = require("express");
var router = express.Router();
var alert = require("alert-node");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.json());


/**
 * This route loads the form page.
 */
router.get("/", function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    res.render("index", {
      sessionData: req.session.userProfile,
      data: ""
    });
  }
});

/**
 * This route loads a particular course details from the session.
 */
router.get("/:course_index", function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    var course = req.session.theCourse[req.params.course_index];
    res.render("index", {
      sessionData: req.session.userProfile,
      data: course,
      id: req.params.course_index
    });
  }
});

module.exports = router;
