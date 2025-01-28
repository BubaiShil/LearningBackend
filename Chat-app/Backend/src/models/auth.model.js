import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    fullname :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
        minlength : 6
    },
    profilepic :{
        type : String,
        default: ""
    },
},{timestamps:true})


const User = mongoose.model("User",authSchema)

export default User