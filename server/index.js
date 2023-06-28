const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/RecipeRoute')
require("dotenv").config()
const app = express()
app.use(express.json())


// app.get('/',async (req,res) =>{
//     res.send('hello from tamizhveandan')
// })

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log('connected to MongoDB'))
.catch((err) => console.log(err));

app.use(routes)

app.listen(8080,()=> console.log("hi"))