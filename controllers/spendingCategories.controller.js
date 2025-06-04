const { SpendingCategory } = require("../models");

const spendingCategoriesController = {
  async addCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          error: "Income category name must be included!",
        });
      }

      const newCategory = await SpendingCategory.create({
        name,
      });

      res.status(201).json({
        message: "New Spending category created!",
        spendingCat: newCategory,
      });
    } catch (error) {
      console.error("new spending category error ", error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  // fetching all income categories
  async getAllCategories(req, res) {
    try {
      const spendingCategories = await SpendingCategory.findAll();
      if (spendingCategories.length === 0) {
        return res.status(404).json({
          error: "No spending categories found!",
        });
      }

      res.status(200).json(spendingCategories);
    } catch (error) {
      console.error("Fetching spending categories error ", error);
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
      const [rowsUpdated] = await SpendingCategory.update(
        {
          name,
        },
        { where: { id } }
      );
      //   console.log("updated cat ", rowsUpdated);

      if (rowsUpdated.length === 0) {
        return res.status(404).json({ error: "Category not found" });
      }

      const updateCat = await SpendingCategory.findByPk(id);
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

      await SpendingCategory.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "Spending Category deleted!",
      });
    } catch (error) {
      console.error("Deleting category error ", error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = { spendingCategoriesController };
