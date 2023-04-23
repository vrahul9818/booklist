const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const user_login = require("./routes/login")
const bookst = require("./routes/bookStore")


const SERVER_PORT = process.env.PORT||8081;
const app = express()


//middleware
app.use(bodyParser.json())
app.use(cors())

const DB = 'mongodb+srv://rahul:rahul@cluster0.8efe9kh.mongodb.net/ops?retryWrites=true&w=majority'

app.use("/book",user_login)
app.use("/book",bookst )

// connections
mongoose.connect(DB).then(()=>{console.log("connected to mongoose atlas")}).catch((err)=>{console.log(err,"no connection")});


//server
app.listen(SERVER_PORT,(()=>{
    console.log(`server ${SERVER_PORT}`)
}))