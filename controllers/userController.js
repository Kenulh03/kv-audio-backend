import User from "../models/user.js";
import bcrypt from "bcrypt";

export function registerUser(req,res){
    
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({message: "User registered successfully"})
    }).catch((error)=>{
        res.status(500).json({error : "User registration failed"})
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email: data.email
    }).then()
}