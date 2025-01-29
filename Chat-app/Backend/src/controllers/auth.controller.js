import { genToken } from "../lib/utils.js";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Fill out all fields!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exits!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });

    if (createUser) {
      genToken(createUser._id, res);
      await createUser.save();

      res.status(201).json({
        _id: createUser._id,
        fullname: createUser.fullname,
        email: createUser.email,
        profilepic: createUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in sign controller", error);
    res.status(400).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    genToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(400).json({ message: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge : 0})
    res.status(200).json({message: "Logged out Sussesfully"})
} catch (error) {
    console.log("error in logout controller", error);
    res.status(400).json({ message: "internal server error" });
  }
};

export const updateProfile = (req,res) =>{
    res.send("fddbfb")
}
