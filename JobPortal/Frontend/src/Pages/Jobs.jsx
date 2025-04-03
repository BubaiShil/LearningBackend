import FilterCard from "../Components/FilterCard";
import Job from "@/Components/Job";
import { useJobStore } from "../Store/useJobStore.js";
import React, { useEffect, useState } from "react";

const Jobs = () => {
  const { jobs, getAllJobs, settingQuery } = useJobStore();
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    console.log("Jobs before filtering:", jobs);
    console.log("Setting Query:", settingQuery);

    if (settingQuery?.trim()) {
      const queryWords = settingQuery.trim().toLowerCase().split(" ");

      const filteredData = jobs.filter((job) => {
        const titleMatch = queryWords.some(word => job?.title?.toLowerCase().includes(word));
        const descriptionMatch = queryWords.some(word => job?.description?.trim().toLowerCase().includes(word));
        const locationMatch = queryWords.some(word => job?.location?.toLowerCase().includes(word));

        return titleMatch || descriptionMatch || locationMatch;
      });

      console.log("Filtered Jobs:", filteredData);
      setFilter(filteredData);
    } else {
      setFilter(jobs);
    }
  }, [settingQuery, jobs]); 

  console.log("Final Filtered Jobs:", filter);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-5">
        <div className="w-1/5 mt-32">
          <FilterCard />
        </div>
        {filter.length === 0 ? (
          <span className="mt-32 text-lg text-red-500">No jobs found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4 mt-32">
              {filter.map((job, idx) => (
                <div key={job?.id || idx}>
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
