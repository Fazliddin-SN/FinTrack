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

exports.updateCurrentBalanceOnDelete = async (entry, isIncome = true) => {
  try {
    const balance = await CurrentBalance.findOne({
      where: { id: 1 },
    });

    if (!balance) {
      console.error("Balance record not found for user:", userId);
      return;
    }

    const sign = isIncome ? -1 : 1;

    balance.uzs_cash += sign * parseFloat(entry.uzs_cash || 0);
    balance.usd_cash += sign * parseFloat(entry.usd_cash || 0);
    balance.card += sign * parseFloat(entry.card || 0);
    balance.account += sign * parseFloat(entry.account || 0);
    await balance.save();

    console.log("Changed fields:", balance.changed()); // Should list the updated fields
  } catch (error) {
    console.error(error);
  }
};

// updates when user updates income or expense
exports.updateCurrentBalanceOnEdit = async (oldEntry, newEntry, isIncome) => {
  const balance = await CurrentBalance.findOne({
    where: { id: 1 },
  });

  const sign = isIncome ? 1 : -1;

  // reverse old one
  if (oldEntry) {
    balance.uzs_cash -= sign * parseFloat(oldEntry.uzs_cash || 0);
    balance.usd_cash -= sign * parseFloat(oldEntry.usd_cash || 0);
    balance.card -= sign * parseFloat(oldEntry.card || 0);
    balance.account -= sign * parseFloat(oldEntry.account || 0);
  }

  // apply new
  if (newEntry) {
    balance.uzs_cash += sign * parseFloat(newEntry.uzs_cash || 0);
    balance.usd_cash += sign * parseFloat(newEntry.usd_cash || 0);
    balance.card += sign * parseFloat(newEntry.card || 0);
    balance.account += sign * parseFloat(newEntry.account || 0);
  }

  await balance.save();
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
