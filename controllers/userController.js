import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerUser(req,res){
    
    if(req.user == null){
        res.status(401).json({
            message: "Please login and try again"
        })
        return
    }
    if(req.user.role !="admin"){
        res.status(403).json({
            message: "you are not authorized to perform this action"
        })
        return
    }
    
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    // newUser.save().then(()=>{
    //     res.json({message: "User registered successfully"})
    // }).catch((error)=>{
    //     res.status(500).json({error : "User registration failed"})
    // })

    try{
        await newUser.save()
        res.json({message: "User registered successfully"})
    }catch(error){
        res.status(500).json({error : "User registration failed"})
    }
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email: data.email
    }).then(
        (user) => {

            if(user==null){
                res.status(404).json({error: "User not found"});
            }else{
                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect) {
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email: user.email,
                        role: user.role,
                        profilePicture: user.profilePicture,
                        phone:user.phone
                    },process.env.JWT_SECRET)

                    res.json({message: "Login successful",token:token });
                }else {
                    res.status(401).json({error: "Login failed"})
                }
            }
        });
}

export function isItAdmin(req){
    let isAdmin = false;

    if(req.user!=null){
        if(req.user=="admin"){
            isAdmin=true;
        }
    }
    return isAdmin;
}

export function isItCustomer(req){
    let isCustomer=false;

    if(req.user!=null){
        if(req.user=="customer"){
            isCustomer = true;
        }
    }
    return isCustomer;
}