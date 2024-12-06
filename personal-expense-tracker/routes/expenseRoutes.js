const express = require("express");
const { addExpense, getExpenses, analyzeSpending } = require("../services/expenseService");

const router = express.Router();

// Add a new expense
router.post("/", (req, res) => {
    const { category, amount, date } = req.body;

    if (!category || !amount || !date) {
        return res.status(400).json({ status: "error", error: "Missing required fields." });
    }

    if (!["Food", "Travel", "Shopping", "Bills", "Other"].includes(category)) {
        return res.status(400).json({ status: "error", error: "Invalid category." });
    }

    if (amount <= 0) {
        return res.status(400).json({ status: "error", error: "Amount must be positive." });
    }

    const result = addExpense({ category, amount, date });
    res.json(result);
});

// Retrieve expenses with optional filters
router.get("/", (req, res) => {
    const { category, startDate, endDate } = req.query;
    const result = getExpenses({ category, startDate, endDate });
    res.json(result);
});

// Analyze spending
router.get("/analysis", (req, res) => {
    const result = analyzeSpending();
    res.json(result);
});

module.exports = router;
