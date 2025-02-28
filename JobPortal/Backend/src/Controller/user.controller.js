import { User } from "../Models/user.model.js";
import {getToken} from '../Utils/Token.js'
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const file = req.file
  //console.log(fullName, email, password, role,file);
  

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
      await createUser.save();
      getToken(createUser._id,res);
      

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

    if (!user || !isPassCorrect || user.role !== role) {
      return res.status(400).json({ message: "Invalid credentials" });
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


export const updateProfile = async (req, res) => {
  const { fullName, email, bio, skill, resume } = req.body;

  try {
    console.log("Received update request:", req.body); // Debugging log

    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;

    if (bio || skill || resume) {
      updateData.profile = {};
      if (bio) updateData.profile.bio = bio;
      if (skill) updateData.profile.skills = skill.split(",").map(s => s.trim());
      if (resume) updateData.profile.resume = resume;
    }

    console.log("Update data prepared:", updateData); // Debugging log

    const userId = req.user?._id; // Ensure `req.user` exists
    if (!userId) {
      console.error("User ID not found in request.");
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    console.log("Updating user with ID:", userId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};



export const chechAuth = (req,res) =>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("error in checkauth", error);
    res.status(400).json({ message: "internal server error" });
  }
}
