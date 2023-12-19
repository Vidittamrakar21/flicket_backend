const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const movie_router = require('./router/movie')
const status_router = require('./router/status')
const ticket_router = require('./router/ticket')
const user_router = require('./router/user')
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://vidit:3OI8NfjQQUVCgmRZ@cluster0.beevlkl.mongodb.net/flicket?retryWrites=true&w=majority');
  console.log("Database Connected");
}


app.use('/api/movie', movie_router);
app.use('/api/status', status_router);
app.use('/api/ticket', ticket_router);
app.use('/api/user', user_router);

app.get('/', (req,res)=>{
    res.json("backend work started !")
})



app.listen(8080, ()=>{
    console.log("server started")
})