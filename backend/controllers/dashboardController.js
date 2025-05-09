// const Income = require('../models/Income.model')
// const Expense = require('../models/Expense.model')
// const { isValidObjectId, Types } = require('mongoose')


// // Dashboard Data 
const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const { Types } = require('mongoose');

// Dashboard Data
const getDashboardData = async (req, res) => {
    
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        // Fetch total income
        const totalIncomeResult = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalIncome = totalIncomeResult[0]?.total || 0;

        // Fetch total expense
        const totalExpenseResult = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpense = totalExpenseResult[0]?.total || 0;

        // Last 60 days income
        const last60DaysIncomeTransaction = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Last 30 days expense
        const last30DaysExpenseTransaction = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Last 5 income and expense transactions
        const latestIncomes = await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);
        const latestExpenses = await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);

        const lastTransaction = [
            ...latestIncomes.map(txn => ({ ...txn.toObject(), type: 'income' })),
            ...latestExpenses.map(txn => ({ ...txn.toObject(), type: 'expense' }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // Limit final result to 5

        // Final response
        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransaction
            },
            recentTransactions: lastTransaction
        });

    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ message: 'Server Error Fetching Dashboard Data', error: err.message });
    }
};

module.exports = { getDashboardData };
