module.exports = function requireRole(...role) {
  return (req, res, next) => {
    const userRole = req.user.role_id;
    // console.log("user role ", userRole, role);

    if (role.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  };
};
