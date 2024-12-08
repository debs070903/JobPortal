import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/jobSlice";

export const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchQuery(query));
    navigate('/browse');
  }

  return (
    <div>
      <div className="w-[60%] my-14 mx-auto py-4 flex flex-col gap-2 justify-center">
        <h2 className="text-lg font-semibold text-[#3B82F6] text-center">
          The Top Job Hunt Website in India
        </h2>
        <h1 className="text-4xl font-bold text-center leading-tight my-3">
          Search, Apply &<br />
          Get Your <span className="text-[#1E3A8A]">Dream Job!</span>
        </h1>
        <p className="text-center w-[95%] mx-auto">
          Discover opportunities, connect with top companies, and start your
          seamless journey toward career success today!
        </p>
        <div className="flex h-11 mt-10 w-[90%] mx-auto">
          <Input
            type="text"
            placeholder="Search your dream job..."
            className="rounded-r-none h-full shadow-lg border-none bg-[#EFF6FF]"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchHandler} className="rounded-l-none h-full bg-[#1E3A8A] text-white hover:bg-[#3B82F6] transition duration-300 ease-in-out shadow-lg">
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};
