const { CurrentBalance, BalanceData } = require("../models");
const { Op } = require("sequelize");

exports.getCurrentBalance = async (req, res, next) => {
  try {
    const currentBalance = await CurrentBalance.findOne({ where: { id: 1 } });
    if (!currentBalance) {
      return res.status(404).json({
        error: "Hozirgi balance boyicha malumot topilmadi!",
      });
    }

    res.status(200).json({
      currentBalance,
    });
  } catch (error) {
    console.error("Failed to fetch current balance!", error);
    res.status(500).json({ error: "Failed to fetch spending records" });
  }
};

exports.balanceData = async (req, res, next) => {
  const page = req.query.page || 0;
  const size = req.query.size || 50;
  const { startDate, endDate, sort = "id", order } = req.query;
  try {
    // initializing where clause
    let whereClause = {};

    // sorting type and order
    const validFields = ["uzs_cash", "usd_cash", "card", "account"];
    const field = validFields.includes(sort) ? sort : "id";
    const orderType = order === "asc" ? "ASC" : "DESC";

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
    const { count, rows } = await BalanceData.findAndCountAll({
      where: whereClause,
      order: [[field, orderType]],
      offset: page * size,
      limit: size,
    });
    res.json({
      balanceData: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      status: "ok",
    });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Failed to fetch balance data records" });
  }
};
