import React, { useEffect } from "react";
import { Navbar } from "./shared/Navbar.jsx";
import { Footer } from "./shared/Footer.jsx";
import { JobCard } from "./JobCard.jsx";
import { useGetAllJobs } from "@/hooks/useGetAllJobs.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice.js";
//import { motion } from "framer-motion";

//const randJobs = [1, 2, 3, 4, 5, 6];

export const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="my-10 mx-auto w-[80%] flex-grow">
        <div>
          <h1 className="text-gray-500 italic">
            Search Results ({allJobs.length})
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {allJobs.map((job) => {
            return <JobCard key={job._id} job={job} />;
          })}
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};
