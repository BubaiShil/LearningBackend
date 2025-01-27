import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
    productId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        required : true
    }
})


const orderSchema = new mongoose.Schema({
    orderPrice :{
        type :Number,
        required :true
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItem :{
        type: [orderItemSchema]
    }

},{timestamps:true})


export const Order = mongoose.model("Order",orderSchema)