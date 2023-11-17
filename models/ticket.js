const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketschema = new Schema({

        showlocation: String,
        city: String,
        name: String,
        mobileno: Number,
        showtime: String,
        showdate: String,
        seatno: String,
        bookingid: String,
        bookingdate: {type: Date, default: Date.now},
        validity: String


});

module.exports = mongoose.model('tickets', ticketschema);