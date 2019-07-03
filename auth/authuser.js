module.exports = function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("info", "Please Login or Signup");
    res.redirect("/login");
  }
};
