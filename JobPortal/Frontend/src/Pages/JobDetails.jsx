import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
    const params = useParams();
   // const jobId = params.id;

    return (
        <div className="max-w-7xl mx-auto  p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mt-28">
                <div>
                    <h1 className="text-2xl font-bold">Software Engineer</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="badge badge-primary">2 Positions</div>
                        <div className="badge badge-secondary">Full-Time</div>
                        <div className="badge badge-accent">12 LPA</div>
                    </div>
                </div>
                <button className="btn btn-primary rounded-lg">Apply Now</button>
            </div>
            <h1 className="border-b-2 border-gray-300 font-medium py-4 text-lg">Job Description</h1>
            <div className="my-4 space-y-3">
                <h1 className="font-bold">Role: <span className="pl-4 font-normal text-gray-800">Software Engineer</span></h1>
                <h1 className="font-bold">Location: <span className="pl-4 font-normal text-gray-800">Remote</span></h1>
                <h1 className="font-bold">Description: <span className="pl-4 font-normal text-gray-800">Develop and maintain web applications.</span></h1>
                <h1 className="font-bold">Experience: <span className="pl-4 font-normal text-gray-800">3 yrs</span></h1>
                <h1 className="font-bold">Salary: <span className="pl-4 font-normal text-gray-800">12 LPA</span></h1>
                <h1 className="font-bold">Total Applicants: <span className="pl-4 font-normal text-gray-800">24</span></h1>
                <h1 className="font-bold">Posted Date: <span className="pl-4 font-normal text-gray-800">2024-02-28</span></h1>
            </div>
        </div>
    );
};

export default JobDetails;
