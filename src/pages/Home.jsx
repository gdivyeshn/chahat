import React, { useEffect, useState } from "react";
import { CategoriesAPI, OtherDetailsAPI, ProductAPI } from "../API";
import { ContextStore } from "../layouts/WebLayout";
import { useNavigate } from "react-router-dom";
import TopicHeading from "../components/TopicHeading";
import Loading from "../components/Loading";
import { Rating } from "react-simple-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Navigation } from "swiper/modules";
import BlogCard from "../components/BlogCard";
import FlowerPng from "../images/flower.png";
import MasalaPng from "../images/masala.png";
import FanSvg from "../images/svg/fan.svg";
import SmileSvg from "../images/svg/smile.svg";
import CupSvg from "../images/svg/cup.svg";
import LeavePng from "../images/leave.png";

const Home = () => {
  const navigate = useNavigate();
  const [bannerDetails, setBannerDetails] = useState();
  const { setShowNotification } = ContextStore();
  const [bannerLoading, setBannerLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { recantProducts, recantBlogs } = ContextStore();
  const [selectedCategory, setSelectedCategory] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
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
  const getAllCategories = () => {
    fetch(CategoriesAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setCategories(data.data);
          setSelectedCategory(data.data?.[0]);
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
    if (!ignore) {
      getSingleData();
      getAllCategories();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getAllProducts = () => {
    setProductLoading(true);
    fetch(ProductAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 8,
        category: selectedCategory?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setAllProducts(data.data);
        } else {
          setShowNotification({
            show: true,
            message: <div>{data.error}</div>,
            title: "Backend Error",
            status: "failed",
          });
        }
        setProductLoading(false);
      });
  };
  useEffect(() => {
    if (!ignore && selectedCategory) getAllProducts();
    return () => {
      ignore = true;
    };
  }, [selectedCategory]);
  return (
    <div className="flex flex-col items-center py-16 max-md:space-y-10 space-y-20">
      <div className="px-4 w-full lg:w-11/12 xl:w-5/6">
        {bannerLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-10 w-full items-center justify-center max-lg:flex-col-reverse relative">
            <img src={LeavePng} className="absolute w-16" alt="" />
            <div className="w-full max-md:space-y-5 space-y-10 relative">
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
            <div className="w-full flex items-end justify-center max-w-2xl relative">
              <img className="" src={bannerDetails?.imgUri} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="bg-MasalaPng bg-no-repeat bg-[length:300px] flex justify-center w-full py-8">
        <div className="px-4 w-full lg:w-11/12 xl:w-5/6 max-md:space-y-8 space-y-16">
          <TopicHeading
            category="Best Food Menu"
            title="Our Popular namkeen Items"
          />
          <div className="grid gap-5 lg:gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {recantProducts.slice(0, 4).map((item, ind) => (
              <div key={ind} className="flex justify-center">
                <div className="p-4 space-y-2 rounded-2xl bg-[#FAF9F2] shadow-lg font-semibold w-fit px-8 text-center">
                  <div className="flex justify-center p-4 px-8">
                    <img src={item.imgUri} className="max-h-48" alt="" />
                  </div>
                  <p className="text-xl text-primaryColor">{item?.name}</p>
                  <p className="text-xs text-grayColor line-clamp-3">
                    {item?.description || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full py-8 max-md:space-y-10 space-y-20 relative">
        <div>
          <img src={LeavePng} className="absolute right-[20%]  w-16" alt="" />
          <TopicHeading category="Blog & News" title="Get Update Our Foods" />
        </div>
        <div className="relative max-md:px-2 px-10 flex max-md:gap-2 gap-4 items-center justify-center">
          <ChevronLeftIcon className="select-none max-sm:min-w-8 max-sm:max-w-8 min-w-12 max-w-12 cursor-pointer swiper-button-prev text-primaryColor p-2 shadow-lg bg-transparent rounded-full" />
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="w-full"
          >
            {recantBlogs.map((item, ind) => (
              <SwiperSlide>
                <BlogCard item={item} key={ind} />
              </SwiperSlide>
            ))}
          </Swiper>
          <ChevronRightIcon className="select-none max-sm:min-w-8 max-sm:max-w-8 min-w-12 max-w-12 cursor-pointer swiper-button-next text-primaryColor p-2 shadow-lg bg-transparent rounded-full" />
        </div>
      </div>
      <div
        className="bg-no-repeat flex justify-center w-full max-md:py-8 py-16 bg-[#FAF9F2]"
        style={{
          backgroundImage: `url(${MasalaPng}), url(${FlowerPng})`,
          backgroundPosition: "-20px top, right -100px",
          backgroundSize: "250px, 200px",
        }}
      >
        <div className="px-4 w-full lg:w-11/12 xl:w-5/6 max-md:space-y-8 space-y-16">
          <TopicHeading category="services" title="why choose us" />
          <div className="flex justify-between gap-10 max-sm:flex-col items-center">
            <div className="flex flex-col items-center bg-[#FAF9F260] border-4 border-dashed border-primaryColor/60 rounded-2xl p-4 space-y-5 text-center max-sm:max-w-full max-w-72">
              <img src={FanSvg} className="w-12" alt="" />
              <p className="text-lg font-semibold">velit dictum suscipit</p>
              <p className="text-grayColor text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#FAF9F2] border-4 border-dashed border-primaryColor/60 rounded-2xl p-4 space-y-5 text-center max-sm:max-w-full max-w-72">
              <img src={SmileSvg} className="w-12" alt="" />
              <p className="text-lg font-semibold">velit dictum suscipit</p>
              <p className="text-grayColor text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#FAF9F2] border-4 border-dashed border-primaryColor/60 rounded-2xl p-4 space-y-5 text-center max-sm:max-w-full max-w-72">
              <img src={CupSvg} className="w-12" alt="" />
              <p className="text-lg font-semibold">velit dictum suscipit</p>
              <p className="text-grayColor text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-VegetablesPng bg-no-repeat bg-right flex justify-center bg-[length:170px]">
        <div className="px-4 w-full lg:w-11/12 xl:w-5/6 flex flex-col items-center max-md:space-y-8 space-y-12">
          <TopicHeading
            category="Best Food Menu"
            title="Our Best namkeen Menus"
          />
          <div className="flex divide-x-2 divide-dashed divide-black">
            {categories.map((cat, ind) => (
              <div key={ind} className="px-8">
                <div
                  className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <img src={cat.imgUri} className="w-10" alt="" />
                  <p
                    className={`text-sm ${
                      selectedCategory?._id === cat._id
                        ? "text-black"
                        : "text-grayColor"
                    }`}
                  >
                    {cat.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {productLoading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <div className="border-2 border-grayColor border-dashed p-10 rounded-lg w-full grid max-md:grid-cols-1 grid-cols-2 gap-10 bg-white/60">
              {allProducts.length ? (
                allProducts.map((item, ind) => (
                  <div key={ind} className="flex gap-4">
                    <img className="h-20" src={item.imgUri} alt="" />
                    <div>
                      <p className="line-clamp-1 text-xl ">{item.name}</p>
                      <p className="line-clamp-1 text-sm text-grayColor">
                        {item.description}
                      </p>
                      <Rating
                        size={15}
                        initialValue={item?.rating ?? 0}
                        readonly
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-2 text-grayColor">
                  Data Not Found! Please try after some time.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
