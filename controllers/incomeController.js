const { Income, IncomeCategory } = require("../models");
const { Op } = require("sequelize");
// Create a new income record
exports.createIncome = async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.status(201).json(income);
  } catch (error) {
    console.error("Error creating income:", error);
    res.status(500).json({ error: "Failed to create income record" });
  }
};

// Get all income records
exports.getIncomes = async (req, res) => {
  const page = req.query.page || 0;
  const size = req.query.size || 30;
  const {
    category_id,
    comment,
    staff_id,
    startDate,
    endDate,
    sort = "id",
    order,
  } = req.query;
  // console.log("end date ", startDate, endDate);
  try {
    // sorting type and order
    const validFields = ["uzs_cash", "usd_cash", "card", "account"];
    const field = validFields.includes(sort) ? sort : "id";
    console.log("sort ", field);

    const orderType = order === "asc" ? "ASC" : "DESC";
    console.log("order type ", orderType);

    // Build the where clause based on query parameters
    const whereClause = {};

    //if category_id is provided, add it to where clause
    if (category_id) {
      whereClause.category_id = category_id;
    }

    // if comment is provided, add it to where clause
    if (comment) {
      whereClause.comment = {
        [Op.like]: `%${comment}%`, // This allows partial matching
      };
    }

    //if staff_id is provided, add it to where claue
    if (staff_id) {
      whereClause.adminId = staff_id;
    }

    // add date filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Ensure correct order
      const [from, to] = start <= end ? [start, end] : [end, start];

      whereClause.date = {
        [Op.between]: [from, to],
      };
    } else if (startDate) {
      whereClause.date = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      whereClause.date = { [Op.lte]: new Date(endDate) };
    }

    const { count, rows } = await Income.findAndCountAll({
      where: whereClause,
      order: [[field, orderType]],
      offset: page * size,
      limit: size,
      include: [{ model: IncomeCategory, as: "category" }],
    });
    res.json({
      incomes: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      status: "ok",
    });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Failed to fetch income records" });
  }
};

// Update an income record
exports.updateIncome = async (req, res) => {
  // console.log(req.body);

  try {
    const { id } = req.params;
    const updated = await Income.update(req.body, { where: { id } });
    res.json(updated);
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Failed to update income record" });
  }
};

// Delete an income record
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Income.destroy({ where: { id } });
    res.json({ message: "Income record deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Failed to delete income record" });
  }
};
