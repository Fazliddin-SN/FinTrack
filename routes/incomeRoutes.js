const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

router.post("/", verifyToken, requireRole(1, 3), incomeController.createIncome);
router.get("/", verifyToken, requireRole(1, 3, 5), incomeController.getIncomes);
router.put(
  "/:id",
  verifyToken,
  requireRole(1, 3),
  incomeController.updateIncome
);
router.delete(
  "/:id",
  verifyToken,
  requireRole(1, 3),
  incomeController.deleteIncome
);

//CHANGING CHECKED STATUS
router.post(
  "/status/:id",
  verifyToken,
  requireRole(5),
  incomeController.changeIncomeCheck
);

module.exports = router;
