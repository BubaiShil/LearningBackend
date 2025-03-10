import { useAuthStore } from "../Store/useAuthStore.js";
import { useJobStore } from "../Store/useJobStore.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { getSingleJob, setONEjob, applyJob } = useJobStore();
  const { authUser } = useAuthStore();
  const params = useParams();
  const jobId = params?.id;

  const [isapplied, setIsapplied] = useState(false);

  useEffect(() => {
    console.log("Fetching job details for jobId:", jobId);
    getSingleJob(jobId);
  }, [getSingleJob, jobId]);

  useEffect(() => {
    if (setONEjob && authUser) {
      const alreadyApplied = setONEjob?.applications?.some(
        (application) => application.applicant === authUser._id
      );
      setIsapplied(alreadyApplied);
    }
  }, [setONEjob, authUser]);

  const applyingJob = async () => {
    console.log("Applying for jobId:", jobId);
    try {
      await applyJob(jobId, authUser._id);
      setIsapplied(true);
    } catch (error) {
      console.log("Error applying for job:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mt-28">
        <div>
          <h1 className="text-2xl font-bold">{setONEjob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <div className="badge badge-primary">
              {setONEjob?.position} Positions
            </div>
            <div className="badge badge-secondary">{setONEjob?.jobtype} </div>
            <div className="badge badge-accent">{setONEjob?.salary} LPA</div>
          </div>
        </div>
        <button
          onClick={applyingJob}
          className={`btn rounded-lg ${isapplied ? "btn-disabled" : "btn-primary"}`}
          disabled={isapplied}
        >
          {isapplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
      <h1 className="border-b-2 border-gray-300 font-medium py-4 text-lg">
        Job Description
      </h1>
      <div className="my-4 space-y-3">
        <h1 className="font-bold">
          Role: <span className="pl-4 font-normal text-gray-800">{setONEjob?.position}</span>
        </h1>
        <h1 className="font-bold">
          Location: <span className="pl-4 font-normal text-gray-800">{setONEjob?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description: <span className="pl-4 font-normal text-gray-800">{setONEjob?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience: <span className="pl-4 font-normal text-gray-800">{setONEjob?.experience}yrs</span>
        </h1>
        <h1 className="font-bold">
          Salary: <span className="pl-4 font-normal text-gray-800">{setONEjob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold">
          Total Applicants: <span className="pl-4 font-normal text-gray-800">{setONEjob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold">
          Posted Date: <span className="pl-4 font-normal text-gray-800">{setONEjob?.createdAt?.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDetails;


