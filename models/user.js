const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({

    name: String,
    email: String,
    mobileno: Number,
    bookings: {type: Array , default: []},
    city: String,
    date: {type: Date, default: Date.now}

});

module.exports = mongoose.model('users', userschema);