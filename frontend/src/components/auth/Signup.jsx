import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

export const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-[40%] mx-auto mt-6">
        <form
          onSubmit={submitHandler}
          className="w-full bg-gray-200 px-6 py-4 drop-shadow-lg rounded-lg"
        >
          <h1 className="font-bold text-4xl mb-5 text-[#1E3A8A]">Sign Up</h1>
          <div className="my-2">
            <Label>
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              required
            />
          </div>
          <div className="my-2">
            <Label>
              Email
            </Label>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              required
            />
          </div>
          <div className="my-2">
            <Label>
              Phone Number
            </Label>
            <Input
              type="text"
              placeholder="123456789"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              required
            />
          </div>
          <div className="my-2">
            <Label>
              Password
            </Label>
            <Input
              type="password"
              placeholder="your password here"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <RadioGroup className="flex items-center gap-4 my-1">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    required
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-2 w-2/3">
              <Label className="w-fit">Upload Image</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer flex-1"
                required
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] transition duration-300 ease-in-out">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait{" "}
            </Button>
          ) : (
            <Button className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] transition duration-300 ease-in-out">
              Sign Up
            </Button>
          )}
          <div className="my-2 text-sm">
            <span>Already have an account? </span>
            <span className="text-blue-600">
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
