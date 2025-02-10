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
             getoken()
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

export const Login=(req,res)=>{res.send("bhbhjb")}

export const Logout=(req,res)=>{res.send("bhbhjb")}

export const Settings=(req,res)=>{res.send("bhbhjb")}

export const UpdateProfile=(req,res)=>{res.send("bhbhjb")}