const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.get('/', (req,res)=>{
    res.json("backend work started !")
})



app.listen(8080, ()=>{
    console.log("server started")
})