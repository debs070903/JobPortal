import React, { useEffect, useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AdminJobsTable } from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useGetAllAdminJobs } from "@/hooks/useGetAllAdminJobs";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "../../../redux/jobSlice";
import { motion } from "framer-motion";

export const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="flex-grow w-[80%] mx-auto my-16"
      >
        <div className="flex items-center justify-between">
          <Input
            className="flex-1 rounded-r-none"
            placeholder="Filter by Name or Role..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="rounded-l-none h-full bg-[#1E3A8A] text-white hover:bg-[#3B82F6] transition duration-300 ease-in-out shadow-l"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};
