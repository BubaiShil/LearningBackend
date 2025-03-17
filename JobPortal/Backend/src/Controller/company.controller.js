import { Company } from "../Models/company.model.js"

export const Register=async(req,res)=>{
    
    try {
        const {name} = req.body
        if(!name){
            return res.status(400).json({message : "Company Name required"})
        }

        const company = await Company.findOne({name : name})
        if (company) {
            return res.status(400).json({message : "Company name already exits"})
        }

        const createCompany = await Company.create({  //create does'nt need save() || new Company({}) need save()
            name,
            userId : req.user._id
        })

        res.status(200).json({
            success: true, 
            message : "Created Company Successfully",
            createCompany
        })
    } catch (error) {
        console.log("Error in company register",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}


export const getCompany = async(req,res)=>{
    try {
        const userId = req.user._id /// only getting particular user company not other
        const company = await Company.find({userId})  //find need object ,since re.id is not obj so we wrap with {}

        if (!company) {
            return res.status(400).json({message : "Company Not Found"})
        }

        res.status(200).json({
            message : "Company Found",
            company,
            userId
        })
    } catch (error) {
        console.log("Error in company get",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}


export const getCompanybyID = async(req,res)=>{
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(400).json({message : "Company not Found"})
        }

        res.status(200).json({
            message : "Got companies",
            company
        })
    } catch (error) {
        console.log("Error in company getbyID",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}


export const updateCompany = async(req,res)=>{
    try {
        const {name,description,location,website} = req.body
        const updateDta = {name,description,location,website}
        const company = await Company.findByIdAndUpdate(req.params.id,updateDta,{new : true})
        if (!company) {
            return res.status(400).json({message : "Company not Found"})
        }

        res.status(200).json({
            success :true,
            message : "Company data updated",
            company
        })

    } catch (error) {
        console.log("Error in company update",error);
        res.status(400).json({message : "Internal Server Error"})
    }
}