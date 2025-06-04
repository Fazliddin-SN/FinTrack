const express = require("express");
const router = express.Router();
const spendingController = require("../controllers/spendingController");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

router.post(
  "/",
  verifyToken,
  requireRole(3, 1),
  spendingController.createSpending
);

router.get(
  "/",
  verifyToken,
  requireRole(3, 1),
  spendingController.getSpendings
);

router.get(
  "/my-spending",
  verifyToken,
  requireRole(3, 1, 2, 5),
  spendingController.mySpendings
);

router.put(
  "/:id",
  verifyToken,
  requireRole(1, 3),
  spendingController.updateSpending
);

router.delete(
  "/:id",
  verifyToken,
  requireRole(1, 3),
  spendingController.deleteSpending
);

module.exports = router;
