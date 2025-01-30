import cloudinary from "../lib/cloudinary.js";
import User from "../models/auth.model.js";
import Message from "../models/message.model.js";


export const getuserForSideBar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filterUser = await User.find({ _id : {$ne : loggedInUserId}}).select("-password")

        res.status(200).json(filterUser)

    } catch (error) {
        console.log("error in getussersiddeBar", error);
        res.status(400).json({ message: "internal server error" });
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or : [
                {senderId : myId , receiverId : userToChatId},
                {senderId : userToChatId ,receiverId : myId}
            ]
        })

        res.status(200).json(messages)


    }
    catch (error) {
        console.log("error in getmessages", error);
        res.status(400).json({ message: "internal server error" });
    }
}


export const sendMessage = async (req,res) =>{
    try {
        const {text , image} = req.body;
        const {id : receiverId} = req.params
        const senderId = req.user._id

        let imageUrl;
        if (image) {
            const uplaodRes = await cloudinary.uploader.upload(text)
            imageUrl = uplaodRes.secure_url
        }

        const createMessage = await User({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })

        await createMessage.save()

        res.status(200).json(createMessage)

    } catch (error) {
        console.log("error in sendmessage", error);
        res.status(400).json({ message: "internal server error" });
    }
}