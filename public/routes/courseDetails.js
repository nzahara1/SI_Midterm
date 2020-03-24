var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var courseModel = require("../models/Course.js");
router.use(bodyParser.json());

router.post("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    res.redirect("/");
  }
  if (
    req.body.courseId == "" &&
    req.body.title == "" &&
    req.body.term == "" &&
    req.body.instructor == ""
  ) {
    res.render("details", { data: "", sessionData: req.session.userProfile });
  } else {
    courseData = courseModel.Course(
      req.body.courseId,
      req.body.title,
      req.body.term,
      req.body.instructor,
      "Yes"
    );
    if (!req.session.theCourse) {
      req.session.theCourse = [];
    }
    req.session.theCourse.push(courseData);
    res.redirect("/");
  }
});

router.patch("/:active", function(req, res) {
  if (!req.session.userProfile) {
    res.redirect("/");
  } else {
    var activeVal = req.session.theCourse[req.params.active].Active;
    activeVal = activeVal == "Yes" ? "No" : "Yes";
    req.session.theCourse[req.params.active].Active = activeVal;
    res.send("success");
  }
});

router.delete("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    res.redirect("/");
  } else {
    var course = req.session.theCourse;
    req.session.theCourse = course.filter(courseData => {
      if (
        courseData.CourseID == req.body.CourseID &&
        courseData.Title == req.body.Title &&
        courseData.Term == req.body.Term &&
        courseData.Instructor == req.body.Instructor &&
        courseData.Active == req.body.Active
      ) {
        return false;
      } else {
        return true;
      }
    });
    res.send("success");
  }
});

module.exports = router;
