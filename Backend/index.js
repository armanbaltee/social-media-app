const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoutes = require("./routes/user.routes")
const postRoutes = require('./routes/post.routes')
const peopleRoutes = require('./routes/people.routes')

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use('/uploads', express.static('uploads'));
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/people', peopleRoutes)
// console.log("1")

mongoose.connect('mongodb://localhost:27017/SocialMedia')
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Database connected")
        console.log(`Server running at http://localhost:/${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(`Error is:`, err)
})