import React from "react";
import LatestJobCards from "../Components/LatestJobCards";
import {useJobStore}  from "../Store/useJobStore.js";

//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  //const { allJobs } = useSelector((store) => store.job);
  const {jobs,getAllJobs} = useJobStore()

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center md:text-left">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {jobs.length <= 0 ? (
          <div className="text-gray-600 text-center col-span-full">
            No Jobs Available
          </div>
        ) : (
          jobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job}/>)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
