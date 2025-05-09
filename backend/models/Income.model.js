const mongoose = require('mongoose')


const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    icon: {
        type: String,

    },

    // Example: Salary, Freelance, etc. 
    source: {
        type: String,
        required: true,

    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

},{timestamps: true});


module.exports = mongoose.model('Income',IncomeSchema)