const { Spending, SpendingCategory } = require('../models');

// Create a new spending record
exports.createSpending = async (req, res) => {
  try {
    const spending = await Spending.create(req.body);
    res.status(201).json(spending);
  } catch (error) {
    console.error('Error creating spending:', error);
    res.status(500).json({ error: 'Failed to create spending record' });
  }
};

// Get all spending records
exports.getSpendings = async (req, res) => {
  try {
    const spendings = await Spending.findAll({
      include: [{ model: SpendingCategory, as: 'category' }],
    });
    res.json(spendings);
  } catch (error) {
    console.error('Error fetching spendings:', error);
    res.status(500).json({ error: 'Failed to fetch spending records' });
  }
};

// Update a spending record
exports.updateSpending = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Spending.update(req.body, { where: { id } });
    res.json(updated);
  } catch (error) {
    console.error('Error updating spending:', error);
    res.status(500).json({ error: 'Failed to update spending record' });
  }
};

// Delete a spending record
exports.deleteSpending = async (req, res) => {
  try {
    const { id } = req.params;
    await Spending.destroy({ where: { id } });
    res.json({ message: 'Spending record deleted successfully' });
  } catch (error) {
    console.error('Error deleting spending:', error);
    res.status(500).json({ error: 'Failed to delete spending record' });
  }
};
