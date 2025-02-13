import jwt from 'jsonwebtoken'
import User from '../models/auth.model.js'

export const protectRoutess = async(req,res,next)=>{
    try {
        
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({message : "Unauthorized ... No Token Provided!"})
        }

        const decodee = jwt.verify(token,process.env.JWT_SECRET)
        if (!decodee) {
            return res.status(401).json({message : "Unauthorized ... Invalid Token!"})
        }

        const user = await User.findById(decodee.userId).select('-password')
        if (!user) {
            return res.status(404).json({message : "User Not Found !"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("error in middleware", error);
        res.status(500).json({ message: "internal server error" });
    }
}