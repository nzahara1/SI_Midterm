var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var alert = require("alert-node");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var courseModel = require("../models/Course.js");
router.use(bodyParser.json());

/**
 * @swagger
 * definitions:
 *   Course:
 *     properties:
 *       CourseID:
 *         type: string
 *       Title:
 *         type: string
 *       Term:
 *         type: string
 *       Instructor:
 *         type: string
 */

/**
 * @swagger
 * /course-details:
 *   post:
 *     description: Creates a Course Data Object in the session
 *     produces:
 *       - html
 *     parameters:
 *       - name: Course
 *         description: Course object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Course'
 *     responses:
 *       'details.ejs':
 *         description: Successfully created
 */
router.post("/", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  }
  if (
    req.body.CourseID == "" &&
    req.body.Title == "" &&
    req.body.Term == "" &&
    req.body.Instructor == ""
  ) {
    res.render("details", { data: "", sessionData: req.session.userProfile });
  } else {
    courseData = courseModel.Course(
      req.body.CourseID,
      req.body.Title,
      req.body.Term,
      req.body.Instructor,
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
 * @swagger
 * /course-details/{course_index}:
 *   patch:
 *     description: Toggles the Active field from 'Yes' to 'No' and vice-versa of a particular course.
 *     produces: string
 *     parameters:
 *     - name: course_index
 *       in: path
 *       description: Index of Course data list.
 *       required: true
 *     responses:
 *       'success':
 *         description: Successfully updated
 *       'No Course Details':
 *         description: Failure
 */
router.patch("/:course_index", function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    var param = req.params.course_index;
    if (param < 0 || param >= req.session.theCourse.length) {
      res.send("No Course Details");
    } else {
      var activeVal = req.session.theCourse[param].Active;
      activeVal = activeVal == "Yes" ? "No" : "Yes";
      req.session.theCourse[param].Active = activeVal;
      res.send("success");
    }
  }
});

/**
 * @swagger
 * /course-details:
 *   delete:
 *     description: Deletes the course data from  thes session object.
 *     produces:
 *       - string
 *     parameters:
 *       - name: Course
 *         description: Course object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Course'
 *     responses:
 *       'success':
 *         description: Successfully created
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
 * @swagger
 * /course-details/{course_index}:
 *   put:
 *     description: This route gets the updated form details and saves it in the session.
 *     produces: string
 *     parameters:
 *     - name: Course
 *       description: Course object
 *       in: body
 *       required: true
 *       schema:
 *          $ref: '#/definitions/Course'
 *     - name: course_index
 *       in: path
 *       description: Index of Course data list.
 *       required: true
 *     responses:
 *       'done':
 *         description: Successfully updated
 *       'No Course Details':
 *         description: Failure
 */
router.put("/:course_index", urlencodedParser, function(req, res) {
  if (!req.session.userProfile) {
    alert("Kindly Login!");
    res.redirect("/");
  } else {
    var param = req.params.course_index;
    if (param < 0 || param >= req.session.theCourse.length) {
      res.send("No Course Details");
    } else {
      req.session.theCourse[param] = {
        CourseID: req.body.CourseID,
        Title: req.body.Title,
        Term: req.body.Term,
        Instructor: req.body.Instructor,
        Active: req.session.theCourse[param].Active
      };
      res.send("done");
    }
  }
});

module.exports = router;
