import { User } from "../Models/user.model.js";
import {getToken} from '../Utils/Token.js'
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "This email already exits" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    if (createUser) {
      getToken(createUser._id,res);
      await createUser.save();

      res.status(201).json({
        _id: createUser._id,
        fullName: createUser.fullName,
        email: createUser.email,
        role: createUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in sign controller", error);
    res.status(400).json({ message: "internal server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //   const role = await User.findOne({role})

    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "Account does'nt exits with current user" });
    }

    getToken(user._id,res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profile: user.profile,
    });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(400).json({ message: "internal server error" });
  }
};

export const Logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge : 0})
        res.status(200).json({message: "Logged out Sussesfully"})
    } catch (error) {
        console.log("error in logout controller", error);
        res.status(400).json({ message: "internal server error" });
      }
}


export const updateProfile = async(req,res)=>{
  const {fullName,email,bio,skill} =req.body

  try {
    const updateData = {}

    if (fullName) updateData.fullName = fullName;
  if (email) updateData.email = email;
  if (bio) updateData.bio = bio;
  if (skill) updateData.skills = skill.split(","); 

    const userId = req.user._id

    const update = await User.findByIdAndUpdate(userId,{$set : updateData},{ new: true, runValidators: true })

    if (!update) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, update });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
