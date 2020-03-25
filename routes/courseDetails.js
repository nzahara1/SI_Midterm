var express = require("express");
var   router = express.Router();
var bodyParser = require("body-parser");
var alert = require("alert-node");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var courseModel = require("../models/Course.js");
router.use(bodyParser.json());

/**
 * This function adds the course data to the session object.
 */
router.post("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
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

/**
 * This route toggles the Active field from 'Yes' to 'No' and vice-versa of a particular course.
 */
router.patch("/:course_index", function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    var activeVal = req.session.theCourse[req.params.course_index].Active;
    activeVal = activeVal == "Yes" ? "No" : "Yes";
    req.session.theCourse[req.params.course_index].Active = activeVal;
    res.send("success");
  }
});

/**
 * This function deletes the course data from  thes session object.
 */
router.delete("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
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

/**
 * This route gets the updated form details and saves it in the session.
 */
router.put("/:course_index", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    req.session.theCourse[req.params.course_index] = {
      CourseID: req.body.CourseID,
      Title: req.body.Title,
      Term: req.body.Term,
      Instructor: req.body.Instructor,
      Active: req.session.theCourse[req.params.course_index].Active
    };
    res.send("done");
  }
});

module.exports = router;
