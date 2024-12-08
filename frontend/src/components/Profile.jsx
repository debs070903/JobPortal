import React, { useState } from "react";
import { Navbar } from "./shared/Navbar";
import { Footer } from "./shared/Footer";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Edit, Mail, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { AppliedJobsTable } from "./AppliedJobsTable";
import { UpdateProfileDialogue } from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import { useGetAllAppliedJobs } from "@/hooks/useGetAllAppliedJobs";
import { motion } from "framer-motion";

export const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  //const skills = ["html", "css", "javascript"];
  const isResume = true;

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
        className="my-20 mx-auto w-[60%]"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-4 justify-center items-center">
            <div className="w-20 h-20">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  className="w-full h-full"
                />
              </Avatar>
            </div>
            <div>
              <h1 className="font-medium text-lg">{user?.fullName}</h1>
              <p className="text-gray-700">{user?.profile?.bio}</p>
            </div>
          </div>
          <Edit
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
          />
        </div>
        <hr className="my-6" />
        <div className="flex gap-4 mt-8 items-center">
          <Mail />
          <p className="text-lg">{user?.email}</p>
        </div>
        <div className="flex gap-4 mt-4 items-center">
          <Phone />
          <p className="text-lg">{user?.phoneNumber}</p>
        </div>
        <div className="flex gap-4 mt-4 items-center">
          <Label className="text-lg">Skills</Label>
          <div className="flex gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <p>NA</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4 items-center">
          <Label className="text-lg">Resume</Label>
          <div className="flex gap-2">
            {isResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <p>NA</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="my-2 text-lg font-medium">Applied Jobs</Label>
          <AppliedJobsTable />
        </div>
      </motion.div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};
