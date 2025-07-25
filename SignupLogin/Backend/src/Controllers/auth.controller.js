import { getToken } from "../lib/utils.js"
import User from "../models/auth.model.js"
import bcrypt from "bcryptjs"

export const Signup=async(req,res)=>{
    const {fullName,email,password} = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message :"Please Enter all fields"})
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be 6 characters" });
        }
  
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({ message: "User already exits!" });
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const createUser = User({
            fullName: fullName,
            email: email,
            password : hashedPassword
        })

        if (createUser) {
          getToken(createUser._id,res)
            await createUser.save()

            res.status(201).json({
                _id: createUser._id,
                fullName: createUser.fullName,
                email: createUser.email,
                profilePic: createUser.profilePic,
              });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
          }
        } catch (error) {
          console.log("error in sign controller", error);
          res.status(400).json({ message: "internal server error" });
        }

}

export const Login= async(req,res)=>{
    const {email,password} = req.body

   try {
     if(!email || !password){
         return res.status(400).json({message :"Please Enter all fields"})
     }
 
     const user = await User.findOne({email})
     if (!user) {
         return res.status(400).json({ message: "Invalid Credentials" });
     }

     const ispassCorrect = await bcrypt.compare(password,user.password)
     if (!ispassCorrect) {
        return res.status(400).json({ message: "Invalid Credentials" });
     }

     getToken(user._id,res)

     res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("error in login controller", error);
      res.status(400).json({ message: "internal server error" });
    }


}

export const Logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge : 0})
        res.status(200).json({message: "Logged out Sussesfully"})
    } catch (error) {
        console.log("error in logout controller", error);
        res.status(400).json({ message: "internal server error" });
      }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
      } catch (error) {
        console.log("error in checkauth", error);
        res.status(400).json({ message: "internal server error" });
      }
}

export const Settings=(req,res)=>{res.send("bhbhjb")}

export const UpdateProfile=(req,res)=>{res.send("bhbhjb")}