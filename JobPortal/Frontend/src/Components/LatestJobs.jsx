import React from "react";
import LatestJobCards from "../Components/LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  //const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center md:text-left">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {randomJobs.length <= 0 ? (
          <div className="text-gray-600 text-center col-span-full">
            No Jobs Available
          </div>
        ) : (
          randomJobs.slice(0, 6).map((job) => <LatestJobCards  />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
