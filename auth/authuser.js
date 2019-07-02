module.exports = function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  } else {
    console.log("not authenticated");
    req.flash("info", "You must be signed in to view that page");
    res.redirect("/login");
  }
};
