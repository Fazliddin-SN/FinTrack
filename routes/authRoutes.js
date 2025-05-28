const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");
// Register Route
router.post("/register", authController.register);

// Login Route
router.post("/login", authController.login);

// users list route
router.get("/users", verifyToken, requireRole(1, 3), authController.userslist);

// update user data
router.put(
  "/users/:id",
  verifyToken,
  requireRole(1),
  authController.updateUser
);

// delete user
router.delete(
  "/users/:id",
  verifyToken,
  requireRole(1),
  authController.deleteUser
);

// role Route
router.get("/roles", authController.roles);

module.exports = router;
