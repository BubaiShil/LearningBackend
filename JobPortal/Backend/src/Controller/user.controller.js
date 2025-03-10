// import { User } from "../Models/user.model.js";
// import getDataUri from "../Utils/datauri.js";
// import {getToken} from '../Utils/Token.js'
// import bcrypt from "bcryptjs";

// import cloudinary from "../Utils/cloudinary.js";
// import fs from "fs";

// export const Signup = async (req, res) => {
//   const { fullName, email, password, role } = req.body;
//   const file = req.file; // Get uploaded file

//   try {
//     if (!fullName || !email || !password || !role) {
//       return res.status(400).json({ message: "Enter all the fields" });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "This email already exists" });
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     let profilePicUrl = ""; // Default empty URL

//     if (file) {
//       // Upload the image to Cloudinary
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: "profile_pictures",
//       });
//       profilePicUrl = result.secure_url;

//       // Remove the local file after upload
//       fs.unlinkSync(file.path);
//     }

//     const newUser = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//       role,
//       profile: {
//         // resume : ////   todo/////////////////////////
//         profilePic: profilePicUrl, // Save Cloudinary URL
//       },
//     });

//     await newUser.save();
//     getToken(newUser._id, res);

//     res.status(201).json({
//       _id: newUser._id,
//       fullName: newUser.fullName,
//       email: newUser.email,
//       role: newUser.role,
//       profilePic: newUser.profile.profilePic,
//     });
//   } catch (error) {
//     console.error("Error in Signup Controller:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const Login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "Enter all the fields" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     const isPassCorrect = await bcrypt.compare(password, user.password);
//     if (!isPassCorrect) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     //   const role = await User.findOne({role})

//     if (!user || !isPassCorrect || user.role !== role) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
    

//     getToken(user._id,res);

//     res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//     });
//   } catch (error) {
//     console.log("error in login controller", error);
//     res.status(400).json({ message: "internal server error" });
//   }
// };

// export const Logout = async (req,res)=>{
//     try {
//         res.cookie("jwt","",{maxAge : 0})
//         res.status(200).json({message: "Logged out Sussesfully"})
//     } catch (error) {
//         console.log("error in logout controller", error);
//         res.status(400).json({ message: "internal server error" });
//       }
// }



// export const updateProfile = async (req, res) => {
//   try {
//     const { fullName, email, bio, skill } = req.body;
//     const file = req.file; // Uploaded file
    
//     //console.log("🔹 Received update request:", req.body);

//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized request" });
//     }

//     // Fetch existing user to retain `profilePic`
//     const existingUser = await User.findById(userId);
//     if (!existingUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const updateData = {};
    
//     if (fullName) updateData.fullName = fullName;
//     if (email) updateData.email = email;

//     // Preserve existing profile and merge new values
//     updateData.profile = { ...existingUser.profile };

//     if (bio) updateData.profile.bio = bio;
//     if (skill) updateData.profile.skills = skill.split(",").map(s => s.trim());

//     // ✅ Handling file upload to Cloudinary
//     if (file) {
//       //console.log("📂 Uploading file to Cloudinary...");
//       const fileUri = getDataUri(file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//       if (cloudResponse) {
//         updateData.profile.resume = cloudResponse.secure_url;
//         updateData.profile.resumerealName = file.originalname;
//       } else {
//         console.warn("⚠️ Cloudinary upload failed.");
//       }
//     }

//     // ✅ Updating user in database
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({ success: true, user: updatedUser });

//   } catch (error) {
//     console.error("❌ Error in updateProfile:", error);
//     res.status(500).json({ success: false, message: "Internal server error", error: error.message });
//   }
// };


// // export const updateProfile = async (req, res) => {
// //   try {
// //     const { fullName, email, bio, skills } = req.body;
// //     const file = req.file; // Uploaded file (Profile Pic or Resume)

// //     console.log("🔹 Received update request:", req.body);
// //     console.log("📂 Received file:", file || "No file uploaded");

// //     const userId = req.user?._id;
// //     if (!userId) {
// //       return res.status(401).json({ success: false, message: "Unauthorized request" });
// //     }

// //     // Fetch existing user to retain existing profile data
// //     const existingUser = await User.findById(userId);
// //     if (!existingUser) {
// //       return res.status(404).json({ success: false, message: "User not found" });
// //     }

// //     const updateData = {
// //       fullName: fullName || existingUser.fullName,
// //       email: email || existingUser.email,
// //       profile: {
// //         ...existingUser.profile,
// //         bio: bio || existingUser.profile.bio,
// //         skills: skills ? skills.split(",").map((s) => s.trim()) : existingUser.profile.skills,
// //       },
// //     };

// //     // ✅ Handle file upload (Profile Picture or Resume)
// //     if (file) {
// //       console.log("📂 Uploading file to Cloudinary...");

// //       const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// //       if (!allowedMimeTypes.includes(file.mimetype)) {
// //         console.error("❌ Invalid file format:", file.mimetype);
// //         return res.status(400).json({ success: false, message: "Invalid file format" });
// //       }

// //       const fileUri = getDataUri(file);
// //       if (!fileUri || !fileUri.content) {
// //         console.error("❌ Error: fileUri is invalid or undefined.");
// //         return res.status(400).json({ success: false, message: "Invalid file format" });
// //       }

// //       try {
// //         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
// //         console.log("✅ Cloudinary Upload Success:", cloudResponse);

// //         if (cloudResponse?.secure_url) {
// //           if (file.mimetype.startsWith("image/")) {
// //             updateData.profile.profilePicture = cloudResponse.secure_url; // Update Profile Picture
// //           } else {
// //             updateData.profile.resume = cloudResponse.secure_url; // Update Resume
// //             updateData.profile.resumeRealName = file.originalname;
// //           }
// //         }
// //       } catch (uploadError) {
// //         console.error("❌ Cloudinary upload error:", uploadError);
// //         return res.status(500).json({ success: false, message: "File upload failed" });
// //       }
// //     }

// //     // ✅ Update user in database
// //     const updatedUser = await User.findByIdAndUpdate(
// //       userId,
// //       { $set: updateData },
// //       { new: true, runValidators: true }
// //     );

// //     res.status(200).json({ success: true, user: updatedUser });

// //   } catch (error) {
// //     console.error("❌ Error in updateProfile:", error);
// //     res.status(500).json({ success: false, message: "Internal server error", error: error.message });
// //   }
// // };



// export const chechAuth = (req,res) =>{
//   try {
//     res.status(200).json(req.user)
//   } catch (error) {
//     console.log("error in checkauth", error);
//     res.status(400).json({ message: "internal server error" });
//   }
// }


import { User } from "../Models/user.model.js";
import getDataUri from "../Utils/datauri.js";
import { getToken } from '../Utils/Token.js';
import bcrypt from "bcryptjs";
import cloudinary from "../Utils/cloudinary.js";
import fs from "fs";

// Helper function to handle file uploads to Cloudinary
const uploadToCloudinary = async (file) => {
  const fileUri = getDataUri(file);
  const result = await cloudinary.uploader.upload(fileUri.content, {
    folder: "profile_pictures",
  });
  fs.unlinkSync(file.path); // Remove the local file after upload
  return result.secure_url;
};

// Signup Controller
export const Signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const file = req.file; // Get uploaded file

  try {
    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload profile picture to Cloudinary if file exists
    let profilePicUrl = "";
    if (file) {
      profilePicUrl = await uploadToCloudinary(file);
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePic: profilePicUrl,
      },
    });

    await newUser.save();
    getToken(newUser._id, res);

    // Return success response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      profilePic: newUser.profile.profilePic,
    });
  } catch (error) {
    console.error("Error in Signup Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const Login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check password
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check role
    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid Role" });
    }

    // Generate token and send response
    getToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profile.profilePic,
    });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout Controller
export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the JWT cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in Logout Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Profile Controller
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, bio, skills } = req.body;
    const file = req.file; // Uploaded file (Profile Pic or Resume)
    const userId = req.user?._id;

    // Validate user ID
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    // Fetch existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prepare update data
    const updateData = {
      fullName: fullName || existingUser.fullName,
      email: email || existingUser.email,
      profile: {
        ...existingUser.profile,
        bio: bio || existingUser.profile.bio,
        skills: skills ? skills.split(",").map((s) => s.trim()) : existingUser.profile.skills,
      },
    };

    
    if (file) {
      const fileUrl = await uploadToCloudinary(file);
      if (file.mimetype.startsWith("image/")) {
        updateData.profile.profilePic = fileUrl; 
      } else {
        updateData.profile.resume = fileUrl; 
        updateData.profile.resumeRealName = file.originalname;
      }
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error in Update Profile Controller:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Check Authentication Controller
export const chechAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in CheckAuth Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};