import React, { useEffect, useState } from "react";
import { Navbar } from "./shared/Navbar.jsx";
import { FilterPage } from "./FilterPage.jsx";
import { JobCard } from "./JobCard.jsx";
import { Footer } from "./shared/Footer.jsx";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

//const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex gap-5 w-full flex-grow">
        <div>
          <FilterPage />
        </div>
        {filterJobs.length <= 0 ? (
          <span className="my-16 text-3xl text-center text-red-500 font-bold flex-1">
            Job Not Found
          </span>
        ) : (
          <div className="flex-1 grid grid-cols-3 gap-3">
            {filterJobs.map((job) => (
              <JobCard key={job?._id} job={job} />
            ))}
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};
