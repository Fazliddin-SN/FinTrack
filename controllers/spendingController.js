const { Spending, SpendingCategory } = require("../models");
const { Op } = require("sequelize");
// Create a new spending record
exports.createSpending = async (req, res) => {
  // console.log("req body ", req.body);

  try {
    const spending = await Spending.create({ ...req.body });
    res.status(201).json(spending);
  } catch (error) {
    console.error("Error creating spending:", error);
    res.status(500).json({ error: "Failed to create spending record" });
  }
};

// Get all spending records
exports.getSpendings = async (req, res) => {
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
  try {
    // sorting type and order
    const validFields = ["uzs_cash", "usd_cash", "card", "account"];
    const field = validFields.includes(sort) ? sort : "id";
    const orderType = order === "asc" ? "ASC" : "DESC";
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

    //add date filter
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      whereClause.date = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      whereClause.date = { [Op.gte]: new Date(endDate) };
    }
    const { count, rows } = await Spending.findAndCountAll({
      where: whereClause,
      order: [[field, orderType]],
      offset: page * size,
      limit: size,
      include: [{ model: SpendingCategory, as: "category" }],
    });

    // console.log("expenses ", rows);

    res.status(200).json({
      expenses: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      status: "ok",
    });
  } catch (error) {
    console.error("Error fetching spendings:", error);
    res.status(500).json({ error: "Failed to fetch spending records" });
  }
};

// Update a spending record
exports.updateSpending = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Spending.update(req.body, { where: { id } });
    res.json(updated);
  } catch (error) {
    console.error("Error updating spending:", error);
    res.status(500).json({ error: "Failed to update spending record" });
  }
};

// Delete a spending record
exports.deleteSpending = async (req, res) => {
  try {
    const { id } = req.params;
    await Spending.destroy({ where: { id } });
    res.json({ message: "Spending record deleted successfully" });
  } catch (error) {
    console.error("Error deleting spending:", error);
    res.status(500).json({ error: "Failed to delete spending record" });
  }
};

// Get all spending records
exports.mySpendings = async (req, res) => {
  const userId = req.user.id;
  const page = req.query.page || 0;
  const size = req.query.size || 30;
  const { comment, startDate, endDate, sort = "id", order } = req.query;
  try {
    // sorting type and order
    const validFields = ["uzs_cash", "usd_cash", "card"];
    const field = validFields.includes(sort) ? sort : "id";
    const orderType = order === "asc" ? "ASC" : "DESC";

    // Build the where clause based on query parameters
    const whereClause = {};

    //if staff_id is provided, add it to where claue
    if (userId) {
      whereClause.staff_id = userId;
    }

    // if comment is provided, add it to where clause
    if (comment) {
      whereClause.comment = {
        [Op.like]: `%${comment}%`, // This allows partial matching
      };
    }

    //add date filter
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      whereClause.date = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      whereClause.date = { [Op.gte]: new Date(endDate) };
    }
    const { count, rows } = await Spending.findAndCountAll({
      where: whereClause,
      order: [[field, orderType]],
      offset: page * size,
      limit: size,
      include: [{ model: SpendingCategory, as: "category" }],
    });

    // console.log("expenses ", rows);

    res.status(200).json({
      expenses: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      status: "ok",
    });
  } catch (error) {
    console.error("Error fetching spendings:", error);
    res.status(500).json({ error: "Failed to fetch spending records" });
  }
};
