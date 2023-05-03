const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    uid:{
        type:String,
        required:[true,'Please provide an uid'],
        unique:false
    },
    expense: {
        type:String,
        required:[true,'Please provide an expense'],
        unique:false
    },
    type: {type:String,
        required:[true,'Please provide a type'],
        unique:false},
    cost: {type: Number,
     required: [true,'Please provide cost'],
    unique: false},
    date: { type: Date,
        reqired:[true,'Please provide date'],
        unique:false
    }
})
module.exports = mongoose.model.expenses_cols || mongoose.model("expenses_cols", ExpenseSchema);
