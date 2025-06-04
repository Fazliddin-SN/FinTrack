const {
  getCurrentBalance,
  balanceData,
} = require("../controllers/balancesController");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

const router = express.Router();
// THIS GETS CURRENT BALANCE
router.get("/current", verifyToken, requireRole(1, 3), getCurrentBalance);
// THIS GET TOTAL BALANCE
router.get("/total", verifyToken, requireRole(1, 3), balanceData);

module.exports = router;
