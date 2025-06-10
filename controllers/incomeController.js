const { Income, IncomeCategory, IncomeCheck } = require("../models");
const { Op } = require("sequelize");
const {
  updateCurrentBalance,
  updateCurrentBalanceOnEdit,
  updateCurrentBalanceOnDelete,
} = require("../utils/helper");

// Create a new income record
exports.createIncome = async (req, res) => {
  try {
    const income = await Income.create(req.body);

    //UPDATE THE CURRENT BALANCE
    updateCurrentBalance(income, true);

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
      whereClause.admin_id = staff_id;
    }
    const isValidDate = (d) => d && !isNaN(new Date(d).getTime());
    //add date filter

    if (isValidDate(startDate) && isValidDate(endDate)) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (isValidDate(startDate)) {
      whereClause.date = {
        [Op.gte]: new Date(startDate),
      };
    } else if (isValidDate(endDate)) {
      whereClause.date = {
        [Op.lte]: new Date(endDate),
      };
    }

    const { count, rows } = await Income.findAndCountAll({
      where: whereClause,
      order: [[field, orderType]],
      offset: page * size,
      limit: size,
      include: [
        { model: IncomeCategory, as: "category" },
        { model: IncomeCheck, as: "checkedStatus" },
      ],
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

    const oldIncome = await Income.findOne({
      where: { id },
    });

    if (!oldIncome) {
      return res.status(404).json({ error: "Income not found" });
    }

    const updated = await Income.update(req.body, { where: { id } });

    const newIncome = await Income.findOne({
      where: { id },
    });

    await updateCurrentBalanceOnEdit(oldIncome, newIncome, true);

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

    const income = await Income.findOne({
      where: { id },
    });

    updateCurrentBalanceOnDelete(income, true);

    await Income.destroy({ where: { id } });

    res.json({ message: "Income record deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Failed to delete income record" });
  }
};

// UPDATE INCOME CHECK STATUS

exports.changeIncomeCheck = async (req, res, next) => {
  const { checkedStatus } = req.query;
  console.log("query ", checkedStatus);

  const { id } = req.params;
  try {
    // find the income
    const income = await Income.findOne({
      where: { id },
    });

    if (!income) {
      return res.status(400).json({
        error: "Bu id bilan kirim topilmadi.",
      });
    }

    const [count, rows] = await Income.update(
      { checked: +checkedStatus },
      { where: { id }, returning: true }
    );

    if (rows === 0) {
      return res.status(400).json({
        error: "Checked status o'zgarmadi!",
      });
    }

    res.status(200).json({
      message: "Income checked status updated!",
      updatedIncome: rows,
    });
  } catch (error) {
    console.error("Failed to update income ", error);
    return res.status(400).json({
      error: " Failed to update income ",
    });
  }
};
