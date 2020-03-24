var express = require("express");
var router = express.Router();
var alert = require("alert-node");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.json());

/**
 * This route gets the updated form details and saves it in the session.
 */
router.put("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    req.session.theCourse[req.body.id] = {
      CourseID: req.body.CourseID,
      Title: req.body.Title,
      Term: req.body.Term,
      Instructor: req.body.Instructor,
      Active: req.session.theCourse[req.body.id].Active
    };
    res.send("done");
  }
});

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
router.get("/:index", function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    var course = req.session.theCourse[req.params.index];
    res.render("index", {
      sessionData: req.session.userProfile,
      data: course,
      id: req.params.index
    });
  }
});

module.exports = router;
