require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Routes Paths
const home = require('./Routes/home')
const notes = require('./Routes/notes')


const app = express()

app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/', home)
app.use('/notes', notes)

// Connecting to port
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('Application connected to DB and running on port ', process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error);
    })