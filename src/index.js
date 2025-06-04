// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/database");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");
const indexRouter = require("../routes/index");
//scheduler
require("../utils/scheduler");

const app = express();

const PORT = process.env.PORT || 3018;

app.use(
  cors({
    origin: /^http:\/\/localhost:\d+$/, // Allow all localhost ports
    credentials: true, // Include this if you need cookies or authentication headers
  })
);

connectDB();
app.use(express.json());
app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.send("Financial Tracker Backend is running");
});

app.get("/api/protected", verifyToken, requireRole("ADMIN"), (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route for admins only" });
});

// app.use("/api/income", incomeRoutes);
// app.use("/api/spending", spendingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
