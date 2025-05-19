const { Income, IncomeCategory } = require('../models');

// Create a new income record
exports.createIncome = async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.status(201).json(income);
  } catch (error) {
    console.error('Error creating income:', error);
    res.status(500).json({ error: 'Failed to create income record' });
  }
};

// Get all income records
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({
      include: [{ model: IncomeCategory, as: 'category' }],
    });
    res.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ error: 'Failed to fetch income records' });
  }
};

// Update an income record
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Income.update(req.body, { where: { id } });
    res.json(updated);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ error: 'Failed to update income record' });
  }
};

// Delete an income record
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Income.destroy({ where: { id } });
    res.json({ message: 'Income record deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ error: 'Failed to delete income record' });
  }
};
