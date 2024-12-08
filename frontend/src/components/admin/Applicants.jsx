import React from "react";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAllApplicants } from "../../../redux/applicationSlice.js";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { ApplicationTable } from "./ApplicationTable";
import { motion } from "framer-motion";

export const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  console.log(applicants);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get/${params.id}`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="flex-grow my-16 mx-auto w-[80%]"
      >
        <h1 className="font-bold text-4xl text-[#3459be]">
          {applicants?.applications?.length === 0
            ? "No applicants yet"
            : applicants?.applications?.length === 1
            ? "1 Applicant"
            : applicants?.applications?.length
            ? `${applicants.applications.length} Applicants`
            : "No applicants yet"}
        </h1>
        <ApplicationTable />
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};
