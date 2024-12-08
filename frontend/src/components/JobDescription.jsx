import React, { useEffect, useState } from "react";
import { Navbar } from "./shared/Navbar";
import { Footer } from "./shared/Footer";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "../../redux/jobSlice.js";
import { toast } from "sonner";
import { setSingleCompany } from "../../redux/companySlice";
import { motion } from "framer-motion";

export const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { singleCompany } = useSelector((store) => store.company);
  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [applied, setApplied] = useState(isApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${singleJob?.company}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, [singleJob?.company, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="my-10 mx-auto w-[80%] flex-grow"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl">{singleCompany?.name}</h1>
            <div className="flex items-center gap-2 mt-6">
              <Badge
                className="py-2 px-4 text-[#3B82F6] hover:scale-105 transition ease-in-out duration-300"
                variant="ghost"
              >
                {singleJob?.openings} Positions
              </Badge>
              <Badge
                variant="ghost"
                className="py-2 px-4 hover:scale-105 transition ease-in-out duration-300"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="py-2 px-4 text-green-400 hover:scale-105 transition ease-in-out duration-300"
                variant="ghost"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={applied ? null : applyJobHandler}
              disabled={applied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  : "bg-[#3B82F6] hover:bg-[#508ef1] hover:scale-105 transition ease-in-out duration-300"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <div className="my-6">
          <p className="text-gray-400 italic">Job Description</p>
          <p className="text-black">{singleJob?.description}</p>
        </div>
        <hr />
        <div className="my-6 flex flex-col gap-3">
          <div className="flex gap-2">
            <h2 className="font-semibold">Role:</h2>
            <span className="text-gray-600">{singleJob?.title}</span>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Location:</h2>
            <span className="text-gray-600">{singleJob?.location}</span>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Experience:</h2>
            <span className="text-gray-600">
              {singleJob?.experience}{" "}
              {singleJob?.experience > 1 ? "Years" : "Year"}
            </span>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Total Applicants:</h2>
            <span className="text-gray-600">
              {singleJob?.applications?.length}
            </span>
          </div>
          <div className="flex gap-2">
            <h2 className="font-semibold">Posted Date:</h2>
            <span className="text-gray-600">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </div>
        </div>
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};
