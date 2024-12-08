import React from "react";
import { LatestJobCards } from "./LatestJobCards";
import { useSelector } from "react-redux";

//const randomJobs = [1,2,3,4,5,6,7,8];

export const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="my-10 mx-auto w-[80%] flex flex-col justify-center">
      <h1 className="text-4xl text-[#1E3A8A] my-4 font-bold text-center">
        Latest Job Openings
      </h1>
      <div className="grid grid-cols-2 gap-4 my-8">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 4)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};
