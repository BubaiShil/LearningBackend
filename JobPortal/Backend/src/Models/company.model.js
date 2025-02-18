import mongoose from "mongoose";


const CompanyScehma = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    website : {
        type : String,
        required : true
    },
    logo : {
        type : String,
    },
},{timestamps: true})

export const Company = mongoose.model("Company",CompanyScehma)