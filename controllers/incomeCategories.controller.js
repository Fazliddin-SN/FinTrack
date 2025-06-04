const { IncomeCategory } = require("../models");

const IncomeCategoryController = {
  async addInCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          error: "Income category name must be included!",
        });
      }

      const newCategory = await IncomeCategory.create({
        name,
      });

      res.status(201).json({
        message: "New Income category created!",
        incomeCat: newCategory,
      });
    } catch (error) {
      console.error("new income category error ", error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  // fetching all income categories
  async getAllCategories(req, res) {
    try {
      const incomeCategories = await IncomeCategory.findAll();
      if (incomeCategories.length === 0) {
        return res.status(404).json({
          error: "No income categories found!",
        });
      }

      res.status(200).json(incomeCategories);
    } catch (error) {
      console.error("Fetching income categories error ", error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  // update cat by id
  async updateCatById(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      // 1) Perform the update; this returns [numberOfRowsUpdated]
      const [rowsUpdated] = await IncomeCategory.update(
        {
          name,
        },
        { where: { id } }
      );
      //   console.log("updated cat ", rowsUpdated);

      if (rowsUpdated.length === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      const updateCat = await IncomeCategory.findByPk(id);
      return res.status(200).json({
        message: "Category updated",
        updateCat,
      });
    } catch (error) {
      console.error("Update Category error ", error.message);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  // delete cat by id
  async deleteCatById(req, res) {
    try {
      const { id } = req.params;

      await IncomeCategory.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "Income Category deleted!",
      });
    } catch (error) {
      console.error("Deleting category error ", error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = { IncomeCategoryController };
