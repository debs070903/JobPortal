import React, { useEffect, useState } from "react";
import { Navbar } from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button";
import { CompaniesTable } from "./CompaniesTable.jsx";
import { Footer } from "../shared/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies.jsx";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../../redux/companySlice.js";
import { motion } from "framer-motion";

export const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="w-[80%] mx-auto my-16 flex-grow"
      >
        <div className="flex items-center justify-between">
          <Input
            className="flex-1 rounded-r-none"
            placeholder="Filter by name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="rounded-l-none h-full bg-[#1E3A8A] text-white hover:bg-[#3B82F6] transition duration-300 ease-in-out shadow-lg"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};
