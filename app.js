var express = require("express");
var app = express();
var course = require("./routes/courseDetails.js");
var index = require("./routes/index.js");
var session = require("express-session");
var login = require("./routes/login.js");

app.set("view engine", "ejs");
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/assets", express.static("assets"));

app.use("/course-details", course);

/**
 * The route loads the course details page.
 */
app.get(["/", "/course-details"], function(req, res) {
  courseData = req.session.theCourse;
  if (courseData == undefined || courseData.length <= 0) {
    res.render("details", { data: "", sessionData: req.session.userProfile });
  } else {
    res.render("details", {
      data: req.session.theCourse,
      sessionData: req.session.userProfile
    });
  }
});

/**
 * This route destroys the session object.
 */
app.get("/logout", function(req, res) {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

app.use("/login", login);
app.use("/form", index);

app.listen(8084);
