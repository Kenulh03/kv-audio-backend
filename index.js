import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import jwt from "jsonwebtoken";
import productRouter from './routes/productRouter.js';

let app = express()

app.use(bodyParser.json());

app.use((req,res,next) => {
    let token = req.header("Authorization");
    //created the auth

    if(token !=null){
        token = token.replace("Bearer ","");
        jwt.verify(token,"kv-secret-89!",(err,decoded) =>{
            if(!err){
                req.user = decoded;
            }
        });
    }
    next()
});

let mongoUrl = "mongodb+srv://admin:123@cluster0.hrkxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})