const Movie = require('../models/movie');
const Status = require('../models/status');

const getallmovie = async (req,res)=>{
    const data = await Movie.find();
    res.status(200).json(data);
}

const specific = async (req,res)=>{
   
    const data = await Movie.find({$and:[{city: "d"},{showlocation: "d"}]});
    res.status(200).json(data);
}

const onem = async (req,res)=>{
    const {mid} = req.body;
    const data = await Movie.findById(mid);
    res.status(200).json(data);
}

const postmovie = async (req,res)=>{
    try {
        const data = req.body;
        const {showlocation , city} = data;

        const newmovie = await Movie.create(data);
        if(newmovie){
            const setid = newmovie._id;
            const id = setid.toString();

            const setstatus = await Status.create({showlocation: showlocation, city: city, movieid: id})
        }

        res.status(201).json(newmovie);
        
    } catch (error) {
        res.json(error);
    }
}

const setstatus = async ( req, res)=> {
    const data = req.body;
    const newstatus = await Status.create(data);
    res.status(201).json(newstatus)
}


const setbanner = async (req,res) =>{
    const {url,mid } = req.body;
    const update = await Movie.findOneAndUpdate({_id: mid }, {bannerimg: url});
    res.status(201).json({message: "Updated successfully", data: update});

}

const searchmovie = async(req,res) =>{
    try {
        const {searchval, city} = req.body;
        if(!searchval){
          res.status(200).json({message: "Search by any movie  name in the bar, to find it !"});
        }
    
        else{
    
          const searchTerm = searchval;
          const regex = new RegExp(searchTerm, 'i');
          const data = await Movie.findOne({$and: [{name: regex}, {city: city }]})
          if(data.length === 0){
            res.status(200).json({message: "empty"});
          }
          else{
    
            res.status(200).json(data);
          }
        }
      } catch (error) {
        res.status(500).json(error);
        console.log(error)
      }
}


const filter = async (req,res)=>{
    try {
        const {type, city} = req.body;
        const searchTerm = type;
        const regex = new RegExp(searchTerm, 'i');
        const data = await Movie.find({$and:[{type: regex},{city: city}]})
        res.status(200).json(data);

        
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

const rating = async (req,res) =>{
    try {
       const  {mid, rate, op} = req.body;

       const data = await Movie.findByIdAndUpdate({_id: mid},{$push: { review: {rate: rate, txt: op}}})
       res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

module.exports = {getallmovie ,postmovie ,setstatus,setbanner,searchmovie,filter,rating,specific,onem}