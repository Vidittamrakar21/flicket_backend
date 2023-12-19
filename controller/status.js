const Status = require('../models/status')

const setallseats = async (req,res) =>{

    try {
        const seat = await Status.updateMany({city: "Indore"},{day1:  {9: 441, 12: 441 , 3: 441, 6: 441, ninepm: 441, 11: 441}, day2:  {9: 441, 12: 441 , 3: 441, 6: 441, ninepm: 441, 11: 441}, day3:  {9: 441, 12: 441 , 3: 441, 6: 441, ninepm: 441, 11: 441}})
         res.status(201).json({message: "updated !"})
    } catch (error) {
        res.json(error)
    }

}

module.exports = {setallseats}