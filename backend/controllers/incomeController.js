const xlsx = require('xlsx')
const Income = require('../models/Income.model')


// Add income source 
const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields 
        if (!source || !amount || !date){
            return res.status(400).json({message: 'All fields are required'})

        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save()
        res.status(200).json(newIncome)

    } catch (err) {
        res.status(500).json({message: 'Server error add income',err})
    }
}

// Get All Income Source 
const getAllIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({userId}).sort({date: -1})
        res.json(income)

    } catch (err) {
        res.status(500).json({message: 'Server Error fetching income', err})
    }
}

// Delete Income Source 
const deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id)
        res.json({message: 'Income Deleted Sucessfully'})
    } catch (err) {
        res.status(500).json({message: 'Server Error delete income', err})
    }
}

// Download Excel 
const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            // Format date
            Date: item.date.toISOString().split('T')[0], 
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');

        // Write workbook to buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set headers for download
        res.setHeader('Content-Disposition', 'attachment; filename=income_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer
        res.send(buffer);

    } catch (err) {
        res.status(500).json({ message: 'Server error during Excel download', error: err.message });
    }
};

// -------------------- This is for downloading the excel file and kept in backend folder -----------------

// const downloadIncomeExcel = async (req, res) => {
//     const userId = req.user.id 

//     try {
//         const income = await Income.find({userId}).sort({date: -1});

//         // Prepare data for excel 
//         const data = income.map((item) => ({
//             Source: item.source,
//             Amount: item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data)
//         xlsx.utils.book_append_sheet(wb, ws, "Income")
//         xlsx.writeFile(wb, 'income_details.xlsx');
//         res.download('income_details.xlsx')

//     } catch (err) {
//         res.status(500).json({message: 'Server Error excel download', err})
        
//     }
// }


module.exports = {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel}