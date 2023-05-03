const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    uid:{
        type:String,
        required:[true,'Please provide an uid'],
        unique:false
    },
    food: {type: Number,
     required: [true,'Please provide food buget'],
    unique: false},
    shopping: {type: Number,
     required: [true,'Please provide shopping buget'],
    unique: false},
    grocery: {type: Number,
     required: [true,'Please provide grocery buget'],
    unique: false},
    transport: {type: Number,
     required: [true,'Please provide transport buget'],
    unique: false},
    rent: {type: Number,
     required: [true,'Please provide rent buget'],
    unique: false},
    personal: {type: Number,
     required: [true,'Please provide personal buget'],
    unique: false},
    entertainment: {type: Number,
     required: [true,'Please provide entertainment buget'],
    unique: false},
    miscellaneous: {type: Number,
     required: [true,'Please provide miscellaneous buget'],
    unique: false},
    date: { type: Date,
        reqired:[true,'Please provide date'],
        unique:false
    }
})
module.exports = mongoose.model.budget_cols || mongoose.model("budget_cols", BudgetSchema);
