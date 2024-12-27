import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';

let app = express()

app.use(bodyParser.json());

let mongoUrl = "mongodb+srv://admin:123@cluster0.hrkxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/users",userRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})