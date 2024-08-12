const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3500
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
require('dotenv').config()


//connect to MongoDB
connectDB()
//Cross Origin Resource Sharing
app.use(cors())
app.use((req,res,next)=>{
    console.log(`${req.method}\t${req.headers.origin} \t${req.url}`)
    next()
})
// built-in middleware for json
app.use(express.json());

//server static files
app.use('/',express.static(path.join(__dirname,"/public")))
app.use('/subdir',express.static(path.join(__dirname,"/public")))

//routes
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employees',require('./routes/api/employees'))


app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,"views","404.html"))
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"})
    }
    else{
        res.type('txt').send("404 Not Found")
    }
})

mongoose.connection.once('open',()=>{
    console.log("MongoDB connected")
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
})