const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type:String,
        required:[true,'Please provide an email'],
        unique:[true, 'Email exists']
    },
    password: {type:String,
        required:[true,'Please provide a password'],
        unique:false},
    uid: {type: String,
     required: true,
    unique: true}
})
module.exports = mongoose.model.users_cols || mongoose.model("users_cols", UserSchema);
