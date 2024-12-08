import React, { useEffect, useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import { useGetCompanyById } from "@/hooks/useGetCompanyById";
import { useGetJobById } from "@/hooks/useGetJobById";
import { motion } from "framer-motion";

export const UpdateJob = () => {
  const params = useParams();
  useGetJobById(params.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    requirements: "",
    salary: 0,
    experience: 0,
    location: "",
    openings: 0,
  });

  const { singleJob } = useSelector((store) => store.job);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(input);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      requirements: singleJob.requirements?.join(", ") || "",
      salary: singleJob.salary || 0,
      experience: singleJob.experience || 0,
      location: singleJob.location || "",
      openings: singleJob.openings || 0,
    });
  }, [singleJob]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="flex-grow w-[80%] mx-auto my-16"
      >
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 py-8">
            <Button variant="outline" onClick={() => navigate("/admin/jobs")}>
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-[#3459be]">Update Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No. of Openings</Label>
              <Input
                type="number"
                name="openings"
                value={input.openings}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#3459be] hover:bg-green-500 cursor-pointer transition ease-in-out duration-300"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};
