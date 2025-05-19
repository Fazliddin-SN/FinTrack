const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/requireRole");
const verifyToken = require("../middlewares/verifyToken");
const {
  spendingCategoriesController,
} = require("../controllers/spendingCategories.controller");

router.post(
  "/add",
  verifyToken,
  requireRole(1),
  spendingCategoriesController.addCategory
);
router.get(
  "/all",
  verifyToken,
  requireRole(1),
  spendingCategoriesController.getAllCategories
);

router.put(
  "/update/:id",
  verifyToken,
  requireRole(1),
  spendingCategoriesController.updateCatById
);

router.delete(
  "/delete/:id",
  verifyToken,
  requireRole(1),
  spendingCategoriesController.deleteCatById
);

module.exports = router;
