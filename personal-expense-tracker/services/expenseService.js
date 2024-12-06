let expenses = []; // In-memory data store
const categories = ["Food", "Travel", "Shopping", "Bills", "Other"]; // Predefined categories

module.exports = {
    // Add a new expense
    addExpense: (expense) => {
        expenses.push(expense);
        return { status: "success", data: expense };
    },

    // Get expenses filtered by category and date range
    getExpenses: (filters) => {
        let filteredExpenses = [...expenses];
        if (filters.category) {
            filteredExpenses = filteredExpenses.filter(exp => exp.category === filters.category);
        }
        if (filters.startDate && filters.endDate) {
            filteredExpenses = filteredExpenses.filter(exp =>
                new Date(exp.date) >= new Date(filters.startDate) &&
                new Date(exp.date) <= new Date(filters.endDate)
            );
        }
        return { status: "success", data: filteredExpenses };
    },

    // Analyze spending patterns
    analyzeSpending: () => {
        const analysis = categories.reduce((acc, category) => {
            acc[category] = expenses
                .filter(exp => exp.category === category)
                .reduce((sum, exp) => sum + exp.amount, 0);
            return acc;
        }, {});

        const highestCategory = Object.entries(analysis).sort((a, b) => b[1] - a[1])[0] || ["None", 0];
        return { status: "success", data: { analysis, highestCategory } };
    },

    // Generate a summary
    generateSummary: () => {
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const monthlySummary = expenses.reduce((acc, exp) => {
            const month = new Date(exp.date).toLocaleString("default", { month: "long" });
            acc[month] = (acc[month] || 0) + exp.amount;
            return acc;
        }, {});
        return { status: "success", data: { totalSpent, monthlySummary } };
    }
};
