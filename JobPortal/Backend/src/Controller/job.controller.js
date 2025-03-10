import { Job } from "../Models/job.model.js"

export const JobPost = async(req,res)=>{
    try {
        const {title,description,position,requiredment,salary,jobtype,company,experience,location} = req.body
        const userId = req.user._id //****req.user._id it should match with the middleware thing

        if (!title || !description || !position || !requiredment || !salary || !jobtype || !company || !experience || !location) {
            return res.status(400).json({message : "Requred to fill all fields"})
        }

        const jobCreate = await Job.create({
            title,
            description,
            position,//it is num in model todo
            requiredment : requiredment.split(","),
            salary : Number(salary),
            jobtype,
            experience,
            location,
            company,
            createdBy : userId
        })


        res.status(200).json({
            message: "created Job",
            jobCreate
        })
    } catch (error) {
        console.log("Error in job create",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}



export const getallJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log("Error in getalljob",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}



export const getJobByID = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path :"applications"
        })
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("Error in getbyIDjob",error);
        res.status(400).json({message : "Internal Server Error"})
    }
} 


export const adminJobs = async(req,res)=>{
    try {
        const companyAdminId = req.user._id
        const jobsbyAdmin = await Job.find({createdBy : companyAdminId})

        if (!jobsbyAdmin) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobsbyAdmin,
            success: true
        })

    } catch (error) {
        console.log("Error in adminjobs",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}

