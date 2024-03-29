const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const statusschema = new Schema({

    movieid: String,
    day1: {
        9: Number,
        12: Number,
        3: Number,
        6: Number,
        ninepm : Number,
        11: Number,
    },
    day2: {
        9: Number,
        12: Number,
        3: Number,
        6: Number,
        ninepm : Number,
        11: Number,
    },
    day3: {
        9: Number,
        12: Number,
        3: Number,
        6: Number,
        ninepm : Number,
        11: Number,
    },
    city: String,
    showlocation: String,
    date: {type: Date, default: Date.now} 
});


module.exports = mongoose.model('status' ,statusschema);