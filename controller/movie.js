const Movie = require('../models/movie');
const Status = require('../models/status');

const getallmovie = async (req,res)=>{
    const data = await Movie.find();
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


module.exports = {getallmovie ,postmovie ,setstatus,setbanner}