import React, { useEffect } from "react";
import { Navbar } from "./shared/Navbar.jsx";
import { HeroSection } from "./HeroSection.jsx";
import { CategoryCarousel } from "./CategoryCarousel.jsx";
import { LatestJobs } from "./LatestJobs.jsx";
import { Footer } from "./shared/Footer.jsx";
import { useGetAllJobs } from "@/hooks/useGetAllJobs.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="flex-grow"
      >
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};
