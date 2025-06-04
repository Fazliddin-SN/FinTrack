const { CurrentBalance, BalanceData } = require("../models");

exports.updateCurrentBalance = async (entry, isIncome = true) => {
  const balanaces = await CurrentBalance.findOne({ where: { id: 1 } });

  const sign = isIncome ? 1 : -1;

  balanaces.uzs_cash += sign * parseFloat(entry.uzs_cash || 0);
  balanaces.usd_cash += sign * parseFloat(entry.usd_cash || 0);
  balanaces.card += sign * parseFloat(entry.card || 0);
  balanaces.account += sign * parseFloat(entry.account || 0);

  await balanaces.save();
};

exports.saveSnapshot = async () => {
  const balanaces = await CurrentBalance.findOne({ where: { id: 1 } });

  await BalanceData.create({
    date: new Date(),
    uzs_cash: balanaces.uzs_cash,
    usd_cash: balanaces.usd_cash,
    card: balanaces.card,
    account: balanaces.account,
  });

  console.log("Kunlik chiqim saqlandi");
};
