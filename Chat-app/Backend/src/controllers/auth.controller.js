import User from "../models/auth.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res)=>{
    const {fullname,email,password} = req.body

    try {
        if(password.length < 6){
            return res.status(400).json({message : "Password must be 6 characters"})
        }

        const user = User.findOne({email})

        if(user){
            return res.status(400).json({message : "User already exits!"})
        }

        const salt = bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(password,salt)

        const createUser = new User({
            fullname:fullname,
            email: email,
            password : hashedPassword
        })

        

    } catch (error) {
        
    }
}

export const login = (req,res)=>{
    res.send("login")
}

export const logout = (req,res)=>{
    res.send("logout")
}