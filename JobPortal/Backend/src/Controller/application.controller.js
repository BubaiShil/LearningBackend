import { Application } from "../Models/application.model.js"
import {Job} from '../Models/job.model.js'

export const applyJob = async (req,res) => {
    try {
        const userId = req.user._id
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        const exitApplication = await Application.find({applicant : userId ,job : jobId})
        if (exitApplication.length > 0) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }


        const newApplication = await Application.create({
            job : jobId,
            applicant : userId
        }) 


        job.applications.push(newApplication._id)

        await job.save()
        res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })


    } catch (error) {
        console.log("error in applyjob", error);
        res.status(400).json({ message: "internal server error" });
    }
}


export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.user._id

        const application = await Application.find({applicant : userId}).sort({createdAt:-1}).populate({
            path : "job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })


        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log("error in appliedJobs", error);
        res.status(400).json({ message: "internal server error" });
    }
}


export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log("error in getapplicants", error);
        res.status(400).json({ message: "internal server error" });
    }
}


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        const application = await Application.findOne({_id : applicationId})
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log("error in updateStatus", error);
        res.status(400).json({ message: "internal server error" });
    }
}