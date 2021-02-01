const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, maxlength: 20, minlength: 6,required: true },
    password: {type: String, maxlength: 20, minlength: 6, required:true},
    data: {type: String},
    role: {type: String, default: 'user'},
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User)

