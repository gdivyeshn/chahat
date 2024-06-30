import React from "react";
import HomeSvg from "../images/svg/home.svg";
import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const PathChain = () => {
  const pathname = useLocation().pathname.split("/")[1].replaceAll("-", " ");
  return (
    <div className="flex gap-1 items-center">
      <img className="w-6" src={HomeSvg} alt="" />
      <Link to="/">Home</Link>
      <ChevronRightIcon className="w-3" />
      <p className="text-primaryColor font-semibold">{pathname}</p>
    </div>
  );
};

export default PathChain;
