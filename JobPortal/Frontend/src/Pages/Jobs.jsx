import FilterCard from "../Components/FilterCard";
import Job from "@/Components/Job";
import {useJobStore}  from "../Store/useJobStore.js";
import React, { useEffect, useState } from "react";

//const jobarray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {

  const {jobs,getAllJobs, settingQuery } = useJobStore()
  const [filter, setFilter] = useState(jobs);

  useEffect(() => {
   getAllJobs()
  }, [])

  useEffect(() => {
    if (settingQuery) {
      const filterdData = jobs.filter((job) => 
        job.title.toLowerCase().includes(settingQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(settingQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(settingQuery.toLowerCase())
      );

      setFilter(filterdData);
    } else {
      setFilter(jobs);
    }
  }, [settingQuery,jobs]);

  console.log(filter);
  
  
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex gap-5 ">
        <div className="w-20%  mt-32 ">
          <FilterCard />
        </div>
        {filter.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4  mt-32 ">
              {filter.map((job,idx) => (
                <div 
                key={idx}
                >
                  <Job job={job} key={job?.id}/>
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
