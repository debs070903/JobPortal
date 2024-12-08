import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Kolkata",
      "Pune",
      "Hyderabad",
      "Mumbai",
      "Bangalore",
      "Remote",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "FrontEnd Developer",
      "BackEnd Developer",
      "FullStack Developer",
      "Web Developer",
      "App Developer",
      "Graphic Designer",
    ],
  },
  /*{
    filterType: "Salary",
    array: ["0-40", "41K-1L", "1L-10L", "10L+"],
  },*/
];

export const FilterPage = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="my-6 mx-6">
      <h1 className="font-bold text-lg">Flter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div className="my-3 flex flex-col gap-2">
            <h1 className="text-base font-bold">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex gap-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
