import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : ""
    },
},{timestamps: true})

const User = mongoose.model("User",authSchema)

export default User