const Ticket = require('../models/ticket')
const User = require('../models/user')

const maketicket = async (req,res) =>{
    try {

        const data = req.body;
        const {uid} = data;

        const ticket = await Ticket.create(data);
        if(ticket){
            const update = await User.updateOne({_id: uid}, {$push: { bookings: ticket._id }});
            res.status(201).json(ticket);
        }

        else{
            res.json({message: "Unable to book the ticket at this moment !, kindly try again after sometime."})
        }
        
    } catch (error) {
        res.status(200).json({message: "An unexpected error occured while creating a post !"})
    }
}

const getticket = async (req,res) =>{
    try {
        const {showlocation, city,showtime, showdate, moviename} = req.body;
        const data = await Ticket.find({$and: [{showlocation: showlocation}, {city: city}, {showdate: showdate}, {showtime: showtime}, {moviename: moviename}]});
        res.status(200).json(data);
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {maketicket,getticket}