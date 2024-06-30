import React, { useEffect, useState } from "react";
import { OtherDetailsAPI } from "../API";
import { ContextStore } from "../layouts/WebLayout";
import { useNavigate } from "react-router-dom";
import TopicHeading from "../components/TopicHeading";
import Loading from "../components/Loading";

const Home = () => {
  const navigate = useNavigate();
  const [bannerDetails, setBannerDetails] = useState();
  const { setShowNotification } = ContextStore();
  const [bannerLoading, setBannerLoading] = useState(false);
  const {} = ContextStore();
  let ignore = false;

  const getSingleData = () => {
    setBannerLoading(true);
    fetch(`${OtherDetailsAPI}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "home-banner" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBannerLoading(false);
        if (data?.status === "success") {
          setBannerDetails(data?.data);
        } else {
          setShowNotification({
            show: true,
            message: <div>{data.error}</div>,
            title: "Backend Error",
            status: "failed",
          });
        }
      });
  };
  useEffect(() => {
    if (!ignore) getSingleData();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="flex flex-col items-center py-16 space-y-16">
      <div className="px-4 w-full lg:w-11/12 xl:w-5/6">
        {bannerLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-10 w-full items-center justify-center max-lg:flex-col-reverse">
            <div className="w-full max-md:space-y-5 space-y-10">
              <p className="max-md:text-3xl text-5xl font-medium">
                {bannerDetails?.title}
              </p>
              <p className="text-grayColor">{bannerDetails?.description}</p>
              <button
                className="rounded-md bg-primaryColor hover:bg-lightColor px-6 py-2 text-white"
                onClick={() => navigate(bannerDetails?.link)}
              >
                Read More
              </button>
            </div>
            <div className="w-full flex items-end justify-center max-w-2xl">
              <img className="" src={bannerDetails?.imgUri} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="bg-MasalaPng bg-no-repeat flex justify-center w-full py-8 max-md:space-y-8 space-y-16">
        <TopicHeading
          category="Best Food Menu"
          title="Our Popular namkeen Items"
        />
        <div></div>
      </div>
    </div>
  );
};

export default Home;
