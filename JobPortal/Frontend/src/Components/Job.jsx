import { useNavigate } from "react-router-dom";
//import { BookmarkIcon } from "@heroicons/react/24/outline"; // Heroicons for Bookmark
import { BookmarkPlusIcon } from "lucide-react";
// import { useEffect } from "react";

const Job = ({ job }) => {
  // const { jobs, getAllJobs} = useJobStore();
  const navigate = useNavigate();
  //const jobId = "cndvbt3cqwe3qerc"

  

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Job Post Time & Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {/* {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} */}
          {job.createdAt.split("T")[0]}
        </p>
        <button className="btn btn-outline btn-circle">
          <BookmarkPlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Company Logo & Name */}
      <div className="flex items-center gap-2 my-2">
        <div className="avatar">
          <div className="w-12 rounded-full border">
            <img src="" alt="Company Logo" />
          </div>
        </div>
        <div>
          {/* <h1 className="font-medium text-lg">{job.title}</h1> */}
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
      </div>

      {/* Job Details (Position, Type, Salary) */}
      <div className="flex items-center gap-2 mt-4">
        <div className="badge badge-outline badge-primary"> {job.position}</div>
        <div className="badge badge-outline badge-error">{job.jobtype}</div>
        <div className="badge badge-outline badge-secondary">
          {job.salary} LPA
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/JobDetails/${job._id}`)}
          className="btn btn-outline"
        >
          Details
        </button>
        <button className="btn btn-primary">Save For Later</button>
      </div>
    </div>
  );
};

export default Job;
