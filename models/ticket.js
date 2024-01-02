const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketschema = new Schema({

        showlocation: String,
        city: String,
        uid: String,
        name: String,
        mobileno: Number,
        email: String,
        showtime: String,
        showdate: String,
        date: String,
        seatno:{type: Array},
        movieid: String,  
        moviename: String,
        bookingdate: {type: Date, default: Date.now},
        validity: String


});

module.exports = mongoose.model('tickets', ticketschema);