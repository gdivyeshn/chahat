import React, { useState } from "react";
import logo from "../images/logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import HeaderSearch from "../components/HeaderSearch";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const pathname = useLocation().pathname.split("/")[1];
  const tabs = [
    { name: "Home", path: "" },
    { name: "About Us", path: "about-us" },
    { name: "Namkeen", path: "namkeen" },
    { name: "Blogs", path: "blogs" },
    { name: "Contact Us", path: "contact-us" },
  ];
  return (
    <div className="sticky top-0 z-50 shadow-md bg-[#FBFBFB]">
      <div className="flex justify-center">
        <div className="flex justify-between items-center px-4 py-2 w-full lg:w-11/12 xl:w-5/6">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24" />
          </Link>
          <div className="flex items-center gap-4 lg:gap-28">
            <div className="hidden lg:flex gap-14 font-bold text-sm text-[#363635]">
              {tabs.map((tab, index) => (
                <Link
                  key={index}
                  to={tab.path}
                  className={`flex gap-1 items-center ${
                    pathname === tab.path && "text-primaryColor"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
            <HeaderSearch />
            <div
              onClick={() => setSidebar(!sidebar)}
              className="lg:hidden cursor-pointer bg-primaryColor rounded-full p-1 flex justify-center items-center shadow-md shadow-gray-400"
            >
              <Bars3Icon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      {sidebar && (
        <div
          className="lg:hidden bg-black/40 fixed top-0 left-0 z-50 h-screen w-screen"
          onClick={() => setSidebar(false)}
        />
      )}
      <div
        className={`lg:hidden bg-[#FBFBFB] fixed z-50 h-screen w-80 shadow-2xl transition-all duration-700 top-0 p-4 flex flex-col justify-between ${
          sidebar ? "left-0" : "-left-[120%]"
        } font-bold text-sm text-[#363635]`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <Link to="/" onClick={() => setSidebar(false)}>
              <img src={logo} alt="logo" className="w-20" />
            </Link>
            <XMarkIcon
              className="text-primaryColor cursor-pointer text-lg w-10 h-10"
              onClick={() => setSidebar(!sidebar)}
            />
          </div>
          {tabs.map((tab, index) => (
            <Link
              key={index}
              to={tab.path}
              onClick={() => setSidebar(false)}
              className={`flex gap-1 items-center ${
                pathname === tab.path && "text-primaryColor"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
