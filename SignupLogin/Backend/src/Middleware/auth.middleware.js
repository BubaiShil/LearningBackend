import jwt from 'jsonwebtoken'
import User from '../models/auth.model.js'

export const protectRoutess = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(400).json({message : "Unauthorized ... No Token Provided!"})
        }

        const decodee = jwt.verify(token,process.env.JWT_SECRETE)
        if (!decodee) {
            return res.status(400).json({message : "Unauthorized ... Invalid Token!"})
        }

        const user = await User.findById(decodee.userId).select('-password')
        if (!user) {
            return res.status(400).json({message : "User Not Found !"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("error in middleware", error);
        res.status(400).json({ message: "internal server error" });
    }
}