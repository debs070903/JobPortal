import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button.jsx";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "../../../redux/authSlice.js";

export const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="sticky top-0 w-full z-50 flex space-between md:h-14 bg-[#EFF6FF] shadow-lg">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold ml-5">
            Job<span className="text-[#1E3A8A]">Portal</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center mr-5 ml-auto">
        <div className="ml-auto mr-5 h-full flex items-center">
          <ul className="flex items-center gap-3 h-full">
            {user && user.role === "recruiter" ? (
              <>
                <li className="pr-5 pl-5 hover:cursor-pointer hover:bg-[#93C5FD] h-full flex items-center transition duration-300 ease-in-out">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="pr-5 pl-5 hover:cursor-pointer hover:bg-[#93C5FD] h-full flex items-center transition duration-300 ease-in-out">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="pr-5 pl-5 hover:cursor-pointer hover:bg-[#93C5FD] h-full flex items-center transition duration-300 ease-in-out">
                  <Link to="/">Home</Link>
                </li>
                <li className="pr-5 pl-5 hover:cursor-pointer hover:bg-[#93C5FD] h-full flex items-center transition duration-300 ease-in-out">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="pr-5 pl-5 hover:cursor-pointer hover:bg-[#93C5FD] h-full flex items-center transition duration-300 ease-in-out">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {!user ? (
          <div className="flex gap-2">
            <Link to="/signup">
              <Button className="bg-[#1E3A8A] text-white p-4 hover:bg-[#3B82F6] transition duration-300 ease-in-out">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="p-4 transition duration-300 ease-in-out hover:bg-[#1E3A8A] border-[#1E3A8A] hover:text-white"
              >
                Log In
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 justify-start">
                  <div>
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">{user?.fullName}</p>
                    <p className="italic text-gray-500 text-sm ">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  {user && user.role === "student" && (
                    <div className="flex gap-1 items-center justify-start">
                      <User2 />
                      <Button variant="link" className="text-slate-900">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-1 items-center justify-start">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-slate-900"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
