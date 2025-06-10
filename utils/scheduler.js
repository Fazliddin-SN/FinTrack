const cron = require("node-cron");

const { saveSnapshot } = require("./helper");

cron.schedule(
  "59 23 * * *",
  () => {
    saveSnapshot();
  },
  { timezone: "Asia/Tashkent" }
);
