import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice";

export const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Designer",
    "App Developer",
    "Java Developer",
    "Python Developer",
    "Data Science",
    "Graphic Designer",
  ];

  return (
    <>
      <Carousel className="w-full max-w-xl mx-auto my-3">
        <CarouselContent>
          {category.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/3">
              <Button
                onClick={() => searchHandler(category)}
                variant="outline"
                className="rounded-full hover:bg-[#1E3A8A] hover:text-white transition duration-300 ease-in-out"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
