import mongoose from "mongoose";


const ApplicationSchema = new mongoose.Schema({
    job : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "Job"
    },
    status :{
        type : String,
        enum : ["accepted","rejected","pending"],
        default:'pending'
    },
    applicant :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},{timestamps:true})


export const Application = mongoose.model("Application",ApplicationSchema)