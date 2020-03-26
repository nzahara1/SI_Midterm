var express = require("express");
var app = express();
var course = require("./routes/courseDetails.js");
var index = require("./routes/index.js");
var session = require("express-session");
var login = require("./routes/login.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Course History API",
      description: "My Courses Information",
      contact: {
        name: "Noor Zahara"
      },
      servers: ["http://localhost:8084"]
    }
  },
  apis: ["routes/*.js", "app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
 * @swagger
 * /course-details:
 *  get:
 *    description: The route loads the course details page.
 *    produces: html
 *    responses:
 *      'details.ejs':
 *        description: A successful response
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
 * @swagger
 * /logout:
 *  get:
 *    description: This route destroys the session object.
 *    produces: html
 *    responses:
 *      'details.ejs':
 *        description: A successful response
 */
app.get("/logout", function(req, res) {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

app.use("/login", login);
app.use("/form", index);

app.listen(8084);
