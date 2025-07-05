import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({message : "Unauthorized ... No Token Provided!"})
    }

    const decoded =  jwt.verify(token,process.env.JWT_SECRETE)

    if(!decoded){
        return res.status(401).json({message : "Unauthorized ... Invalid Token!"})
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
        return res.status(401).json({message : "User Not Found !"})
    }

    req.user = user
    next()


} catch (error) {
    console.log("error in middleware", error);
    res.status(401).json({ message: "internal server error" });
}
};
