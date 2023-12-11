const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieschema = new Schema({
        name: String,
        type: String,
        duration: String,
        releaseon: String,
        description: String,
        cast: {type: Array, default: []},
        review: {type: Array, default: []},
        city: String,
        showlocation: String,
        image: String,
        bannerimg: String,
        date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('movies', movieschema);