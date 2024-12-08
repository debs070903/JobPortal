import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "../../../redux/companySlice";
import { motion } from "framer-motion";

export const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="my-16 mx-auto w-[80%] flex-grow"
      >
        <div>
          <h1 className="font-bold text-2xl text-[#3459be]">
            Your Company Name
          </h1>
          <p className="text-gray-500 italic">
            Give a name to your company, can be changed later!
          </p>
        </div>
        <div className="my-10">
          <Label className="font-bold text-xl">Company Name</Label>
          <Input
            type="text"
            placeholder="Wohoo! The first step!"
            className="my-4"
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="hover:border hover:border-red-500 hover:text-red-500 transition ease-in-out duration-200"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#3459be] hover:bg-green-400 transition ease-in-out duration-200"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </motion.div>
      <Footer className="mt-auto" />
    </div>
  );
};
