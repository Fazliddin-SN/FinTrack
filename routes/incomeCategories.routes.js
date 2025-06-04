const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/requireRole");
const verifyToken = require("../middlewares/verifyToken");
const {
  IncomeCategoryController,
} = require("../controllers/incomeCategories.controller");

router.post(
  "/add",
  verifyToken,
  requireRole(1),
  IncomeCategoryController.addInCategory
);
router.get(
  "/all",
  verifyToken,
  requireRole(1, 3, 2, 5),
  IncomeCategoryController.getAllCategories
);

router.put(
  "/update/:id",
  verifyToken,
  requireRole(1),
  IncomeCategoryController.updateCatById
);

router.delete(
  "/delete/:id",
  verifyToken,
  requireRole(1),
  IncomeCategoryController.deleteCatById
);

module.exports = router;
