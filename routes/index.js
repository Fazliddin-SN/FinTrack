const express = require("express");

const router = express.Router();

// auth Ruter
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

// incomes routes
const incomesRouter = require("./incomeRoutes");
router.use("/income", incomesRouter);

// spendings routes
const spendingRoutes = require("./spendingRoutes");
router.use("/spending", spendingRoutes);

// income categories routes
const incomeCategories = require("./incomeCategories.routes");
router.use("/inCategory", incomeCategories);

// spending categories routes
const spendingCategories = require("./spendingCategories.routes");
router.use("/spdCategory", spendingCategories);

module.exports = router;
