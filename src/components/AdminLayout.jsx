import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3CenterLeftIcon,
  XCircleIcon,
  UserPlusIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import Notification from "../components/Notification";
import LogOutModel from "../components/LogoutModel";
import logo from "../images/logo.png";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const [logOutModel, setLogOutModel] = useState(false);
  const routes = [
    {
      name: "Dashboard",
      activeName: undefined,
      icon: HomeIcon,
      link: "/super_admin/dashboard",
    },
    {
      name: "Product",
      activeName: "product",
      icon: ShoppingBagIcon,
      link: "/super_admin/dashboard/product",
    },
    {
      name: "Blog",
      activeName: "blog",
      icon: ChatBubbleBottomCenterTextIcon,
      link: "/super_admin/dashboard/blog",
    },
    {
      name: "Category",
      activeName: "category",
      icon: SquaresPlusIcon,
      link: "/super_admin/dashboard/category",
    },
    {
      name: "Lead",
      activeName: "lead",
      icon: UserCircleIcon,
      link: "/super_admin/dashboard/lead",
    },
    {
      name: "Subscribe Lead",
      activeName: "subscribe-lead",
      icon: UserPlusIcon,
      link: "/super_admin/dashboard/subscribe-lead",
    },
  ];
  return (
    <div
      className={`md:flex h-screen ${
        showSideBar ? "overflow-y-hidden" : "overflow-y-auto"
      }`}
    >
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="fixed flex flex-col top-0 left-0 w-64 bg-gray-50 h-full border-r">
          <div className="flex items-center justify-center py-2 border-b">
            <div className="flex justify-center flex-col items-center">
              <img alt="logo" src={logo} className="w-16" />
              <p className="font-bold text-2xl text-orange-500">
                Chahat Namkeen
              </p>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <div className="cursor-pointer flex flex-col py-4 space-y-1">
              {routes.map((item, ind) => (
                <div key={ind}>
                  <div
                    onClick={() => {
                      navigate(item.link);
                    }}
                    className={`relative flex flex-row items-center h-11 focus:outline-none mx-3 rounded-md text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:bg-orange-300 ${
                      location.pathname.split("/")[3] === item.activeName &&
                      "bg-orange-300 text-gray-800"
                    }  pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <item.icon className="font-semibold h-5 w-5" />
                    </span>
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            onClick={() => {
              setLogOutModel(true);
            }}
            className={`relative cursor-pointer flex flex-row items-center h-11 focus:outline-none mx-3 mb-3 rounded-md text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:bg-orange-300   pr-6`}
          >
            <span className="inline-flex justify-center items-center ml-4">
              <ArrowRightStartOnRectangleIcon className="font-semibold h-5 w-5" />
            </span>
            <span className="ml-2 font-semibold text-sm tracking-wide truncate">
              Log Out
            </span>
          </div>
        </div>
      </div>
      {showSideBar && (
        <div className="mx-auto flex justify-between items-center shadow-sm">
          {showSideBar && (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          )}
          <div
            className={
              showSideBar
                ? "fixed flex flex-col  top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            <div className="flex items-center justify-center py-2 border-b">
              <div className="flex justify-center flex-col items-center">
                <img alt="logo" src={logo} className="w-16" />
                <p className="font-bold text-2xl text-orange-500">
                  Chahat Namkeen
                </p>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <div className="cursor-pointer flex flex-col py-4 space-y-1">
                {routes.map((item, ind) => (
                  <div key={ind}>
                    <div
                      onClick={() => {
                        navigate(item.link);
                        setShowSideBar(false);
                      }}
                      className={`relative flex flex-row items-center h-11 focus:outline-none mx-3 rounded-md text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:bg-orange-300 ${
                        location.pathname.split("/")[3] === item.activeName &&
                        "bg-orange-300 text-gray-800"
                      }  pr-6`}
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <item.icon className="font-semibold h-5 w-5" />
                      </span>
                      <span className="ml-2 font-semibold text-sm tracking-wide truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              onClick={() => {
                setLogOutModel(true);
              }}
              className={`relative cursor-pointer flex flex-row items-center h-11 focus:outline-none mx-3 mb-3 rounded-md text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:bg-orange-300   pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <ArrowRightStartOnRectangleIcon className="font-semibold h-5 w-5" />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate">
                Log Out
              </span>
            </div>
            <button
              onClick={() => {
                setShowSideBar(false);
              }}
              className="absolute top-0 -right-10"
            >
              <XCircleIcon className="h-10 w-10 text-orange-400" />
            </button>
          </div>
        </div>
      )}
      <LogOutModel
        handleLogOutModel={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        setShowModal={setLogOutModel}
        title={"Log Out"}
        showModal={logOutModel}
      />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center pt-4 pb-3 justify-between md:justify-end px-5 bg-white border-b border-gray-200">
          <div
            onClick={() => {
              setShowSideBar(true);
            }}
            className="flex items-center md:hidden cursor-pointer"
          >
            <Bars3CenterLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex items-center">
            <Notification />
          </div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
