import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import jwt from "jsonwebtoken";
import productRouter from './routes/productRouter.js';
import dotenv from "dotenv";
import env from 'env';
import reviewRouter from './routes/reviewRouter.js';

dotenv.config();

let app = express()

app.use(bodyParser.json());

app.use((req,res,next) => {
    let token = req.header("Authorization");
    //created the auth

    if(token !=null){
        token = token.replace("Bearer ","");
        jwt.verify(token,env.JWT_SECRET,(err,decoded) =>{
            if(!err){
                req.user = decoded;
            }
        });
    }
    next()
});

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})