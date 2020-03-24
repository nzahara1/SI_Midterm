var user = require("../models/user.js");

// Hardcoded users
var userList = [];
user1 = new user.User(
  0,
  "Noor",
  "Zahara",
  "nzahara@uncc.edu",
  "10004 Graduate Lane",
  "NA",
  "Charlotte",
  "NC",
  "28262",
  "U.S.A"
);
userList.push(user1);
user2 = new user.User(
  1,
  "Norm",
  "Niner",
  "norm49@uncc.edu",
  "Cato Hall",
  "University of North Carolina",
  "Charlotte",
  "NC",
  "28223",
  "US"
);
userList.push(user2);

/**
 * This function returns the list of user objects.
 */
var getUsers = function() {
  return userList;
};

/**
 * This function checks if the logged in user details are valid.
 * @param {User} user
 */
var isUserValid = function(user) {
  for (var index = 0; index < userList.length; index++) {
    if (userList[index]._userId == user._userId) {
      return true;
    }
  }
  return false;
};

/**
 * This function returns a random user for each login.
 */
var getRandromUserForLogin = function() {
  return userList[Math.floor(Math.random() * userList.length)];
};

module.exports.getUsers = getUsers;
module.exports.getRandromUserForLogin = getRandromUserForLogin;
module.exports.isUserValid = isUserValid;
