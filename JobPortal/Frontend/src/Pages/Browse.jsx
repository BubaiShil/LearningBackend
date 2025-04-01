import Navbar from "../components/Navbar";
import Job from "../components/Job";
import { useJobStore } from "@/Store/useJobStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Browse = () => {
    const {jobs,getAllJobs,setSettingQuery,settingQuery} = useJobStore()
    const navigate = useNavigate()

   

    useEffect(() => {
       
          getAllJobs(); // Fetch jobs based on the search query
        
      }, [settingQuery, getAllJobs]);
    
    console.log(jobs);
    // console.log(setSettingQuery);
    
    

    return (
        <div>
            
            <div className="max-w-7xl mx-auto  p-4">
                <h1 className="text-2xl font-bold my-6 mt-20">Search Results ({jobs.length})</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Placeholder Job Cards */}
                    {jobs.map((job) => (
                        <div key={job._id} className="card bg-base-100 shadow-md border border-gray-300 hover:shadow-lg transition-all">
                            <div className="card-body p-5">
                                <h2 className="card-title text-lg font-semibold">
                                    {job?.title}
                                </h2>
                                <p className="text-gray-500 text-sm">{job?.company?.name}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="badge badge-primary">{job?.jobtype}</span>
                                    <span className="badge bg-white text-black border  border-gray-300"><span className="text-purple-800 font-bold">Location</span> : {job?.location}</span>

                                </div>
                                <p className="text-sm mt-2 text-gray-600">
                                    {job?.description}
                                </p>
                                <button onClick={()=>navigate(`/JobDetails/${job._id}`)} className="btn btn-primary btn-sm w-full mt-4">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
