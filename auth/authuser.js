module.exports = function authenticatedUser(req, res, next) {
  if (req.cookies.remember_me || req.isAuthenticated()) {
    return next();
  } else {
    req.flash("info", "Please Login or Signup");
    res.redirect("/login");
  }
};
