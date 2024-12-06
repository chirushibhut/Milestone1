const express = require("express");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes/expenseRoutes");
const cron = require("node-cron");
const { generateSummary } = require("./services/expenseService");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/expenses", expenseRoutes);

// CRON job for daily summary
cron.schedule("0 0 * * *", () => {
    const summary = generateSummary();
    console.log("Daily Summary:", summary.data);
});
console.log("CRON job set up for daily summary reports.");

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
