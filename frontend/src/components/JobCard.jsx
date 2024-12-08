import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  //const jobId = "abcdej654";

  const daysAgoFunction = (mongodbTime) => {
    const created = new Date(mongodbTime);
    const current = new Date();
    const timeDifference = current - created;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      className="p-6 rounded-md bg-[#EFF6FF] shadow-xl border border-gray-100 my-10 max-h-96 flex flex-col justify-between"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="rounded-full" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500 italic">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <Badge className="py-2 flex justify-center bg-[#3B82F6] hover:bg-[#3B82F6] hover:scale-105 transition ease-in-out duration-300 w-[30%]">
          {job?.openings} Positions
        </Badge>
        <Badge
          variant="outline"
          className="py-2 px-4 hover:scale-105 transition ease-in-out duration-300 w-[30%] text-center flex justify-center"
        >
          {job?.jobType}
        </Badge>
        <Badge className="py-2 px-4 bg-green-400 hover:bg-green-400 hover:scale-105 transition ease-in-out duration-300 w-[30%] text-center flex justify-center">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="mt-4 flex gap-2 items-center">
        <Button
          variant="outline"
          className="hover:scale-105 transition ease-in-out duration-300 w-full"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
      </div>
    </motion.div>
  );
};
