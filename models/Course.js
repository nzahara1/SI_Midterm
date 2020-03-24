var Course = function(CourseID, Title, Term, Instructor, Active) {
  var course = {
    CourseID: CourseID,
    Title: Title,
    Term: Term,
    Instructor: Instructor,
    Active: Active
  };
  return course;
};

module.exports.Course = Course;
