import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-lg bg-white border border-gray-200 cursor-pointer hover:shadow-xl transition"
    >
      {/* Company Name */}
      <div>
        <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 truncate">{job?.description}</p>
      </div>

      {/* Job Details (Position, Type, Salary) */}
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="badge badge-outline text-blue-600 font-medium">
          {job?.position} Positions
        </div>
        <div className="badge badge-outline text-red-500 font-medium">
          {job?.jobtype}
        </div>
        <div className="badge badge-outline text-purple-600 font-medium">
          {job?.salary} LPA
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
