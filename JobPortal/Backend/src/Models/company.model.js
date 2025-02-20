import mongoose from "mongoose";


const CompanyScehma = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String
    },
    location : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    website : {
        type : String,
    },
    logo : {
        type : String,
    },
},{timestamps: true})

export const Company = mongoose.model("Company",CompanyScehma)