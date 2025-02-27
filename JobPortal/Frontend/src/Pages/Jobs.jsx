import FilterCard from "../Components/FilterCard";
import Job from "@/Components/Job";
import React from "react";

const jobarray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex gap-5 ">
        <div className="w-20%  mt-32 ">
          <FilterCard />
        </div>
        {jobarray.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4  mt-32 ">
              {jobarray.map((job) => (
                <div
                >
                  <Job job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
