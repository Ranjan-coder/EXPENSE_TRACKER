const xlsx = require('xlsx')
const Expense = require('../models/Expense.model')


// Add Expense source 
const addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields 
        if (!category || !amount || !date){
            return res.status(400).json({message: 'All fields are required'})

        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save()
        res.status(200).json(newExpense)

    } catch (err) {
        res.status(500).json({message: 'Server error add expense',err})
    }
}

// Get All Expense Source 
const getAllExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({userId}).sort({date: -1})
        res.json(expense)

    } catch (err) {
        res.status(500).json({message: 'Server Error fetching expense', err})
    }
}

// Delete Expense Source 
const deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message: 'Expense Deleted Sucessfully'})
    } catch (err) {
        res.status(500).json({message: 'Server Error delete expense', err})
    }
}

// Download Excel 
const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            // Format date
            Date: item.date.toISOString().split('T')[0], 
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');

        // Write workbook to buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set headers for download
        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer
        res.send(buffer);

    } catch (err) {
        res.status(500).json({ message: 'Server error during Expense Excel download', error: err.message });
    }
};



module.exports = {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel}