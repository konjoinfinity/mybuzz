module.exports = function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  } else {
    console.log("not authenticated");
    req.flash("info", "Please Login or Signup");
    res.redirect("/login");
  }
};
