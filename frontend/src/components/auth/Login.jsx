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
import { setLoading, setUser } from "../../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
          <h1 className="font-bold text-4xl mb-5 text-[#1E3A8A]">Log In</h1>
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
          {loading ? (
            <Button className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] transition duration-300 ease-in-out">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait{" "}
            </Button>
          ) : (
            <Button className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] transition duration-300 ease-in-out">
              Log In
            </Button>
          )}
          <div className="my-2 text-sm">
            <span>Don't have an account? </span>
            <span className="text-blue-600">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
          {/*<div className="my-2 text-sm">
            <span>Forgot password? </span>
            <span className="text-blue-600">
              <Link to="/login">Click here</Link>
            </span>
          </div>*/}
        </form>
      </div>
    </div>
  );
};