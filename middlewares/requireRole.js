module.exports = function requireRole(role) {
    return (req, res, next) => {
      const userRole = req.user.role_id;
      if (userRole === role) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
  };
  