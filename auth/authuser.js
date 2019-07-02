module.exports = function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();

  req.flash("info", "You must be signed in to view that page");
  res.redirect("/login");
};
