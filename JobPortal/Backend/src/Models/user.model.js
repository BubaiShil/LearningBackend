import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true 
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        enum : ["Student","Recruiter"]
    },
    profile:{
        bio:{
            type : String
        },
        skill:{
            type : String
        },
        resume:{
            type : String
        },
        resumerealName:{
            type : String
        },
        company:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Company"
        },
        profilePic:{
            type : String,
            default: ""
        }
       
    }

},{timestamps:true})

export const User = mongoose.model("User",UserSchema)