import React, { useState, Fragment, useEffect, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { NotificationAPI } from "../API";
import FloatNotification from "./FloatNotification";
import Loading from "./Loading";

const Notification = () => {
  const btnRef = useRef();
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  let ignore = false;
  const getAllNotification = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(NotificationAPI, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "success") {
            setNotification(data?.data);
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };
  const updateNotification = (notification_id, lead_id) => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${NotificationAPI}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: notification_id,
          read: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            navigate(`/super_admin/dashboard/lead/edit-lead?id=${lead_id}`);
            getAllNotification();
            btnRef?.current?.click();
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };
  useEffect(() => {
    if (!ignore && location.pathname === "/super_admin/dashboard") {
      getAllNotification();
    }
    return () => {
      ignore = true;
    };
  }, [location.pathname]);
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              ref={btnRef}
              className={`group w-full inline-flex items-center rounded-md text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <BellIcon className="h-5 w-5" />
              {notification.length > 0 && (
                <div className="absolute -top-2 -right-1 text-xs  flex justify-center items-center bg-primaryColor text-white rounded-full w-4 h-4">
                  {notification.length}
                </div>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 transform px-4 sm:px-0 ">
                <div className="bg-gray-50 w-[300px] shadow-xl rounded-lg">
                  <div className="border-b py-2 border-gray-200 px-5">
                    Notification
                  </div>
                  {loading ? (
                    <div className="w-full flex justify-center">
                      <div className="w-20 py-2">
                        <Loading />
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 py-2 space-y-2 max-h-60 overflow-y-auto">
                      {notification.length > 0 ? (
                        notification.map((lead, ind) => (
                          <div
                            key={ind}
                            className="flex justify-between items-center"
                          >
                            <div className="flex gap-5">
                              <div className="bg-primaryColor/25 text-primaryColor h-10 w-10 rounded-full flex justify-center items-center text-lg">
                                {lead?.lead?.name
                                  ? lead?.lead?.name?.slice(0, 1)
                                  : lead?.lead?.email?.slice(0, 1)}
                              </div>
                              <div>
                                <p>
                                  {lead?.lead?.name
                                    ? lead?.lead?.name
                                    : lead?.lead?.email}
                                </p>
                                <p className="text-sm">Received inquiry</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                updateNotification(lead?._id, lead?.lead?._id);
                              }}
                              className="text-primaryColor border border-primaryColor w-16 rounded"
                            >
                              View
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center">
                          No Notificaiton available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default Notification;
