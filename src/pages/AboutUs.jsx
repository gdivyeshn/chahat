import React from "react";
import PathChain from "../components/PathChain";
import KurkurePng from "../images/about-kurkure.png";
import LeavePng from "../images/leave.png";
import bestPricesOffersSvg from "../images/svg/best-prices-&-offers.svg";
import freeDeliverySvg from "../images/svg/free-delivery.svg";
import greatDailyDealSvg from "../images/svg/great-daily-deal.svg";
import greatDealSvg from "../images/svg/great-deal.svg";
import easyReturnsSvg from "../images/svg/easy-returns.svg";
import wideAssortmentSvg from "../images/svg/wide-assortment.svg";
import bestPriceSvg from "../images/svg/best-price.svg";
import historySvg from "../images/svg/history.svg";
import missionSvg from "../images/svg/mission.svg";
import onTimeDeliverySvg from "../images/svg/on-time-delivery.svg";
import productReturnSvg from "../images/svg/product-return.svg";
import satisfactionSvg from "../images/svg/satisfaction.svg";
import visionSvg from "../images/svg/vision.svg";
import TopicHeading from "../components/TopicHeading";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center gap-10 md:gap-16 py-8 lg:pb-20">
      <div className="px-4 w-full lg:w-11/12 xl:w-5/6 space-y-10 md:space-y-16">
        <PathChain />
        <div className="flex !mt-10 gap-10 w-full justify-center items-center max-md:flex-col">
          <img
            className="max-w-96 w-full aspect-square object-cover rounded-md shadow"
            src={KurkurePng}
            alt=""
          />
          <div className="space-y-8">
            <div className="text-4xl font-bold text-primaryColor w-fit relative">
              <img
                src={LeavePng}
                className="absolute -right-12 -bottom-3 w-16"
                alt=""
              />
              <p className="z-20 relative">About Us</p>
            </div>
            <p className="text-grayColor">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more
              obscure Latin words, consectetur, from a Lorem Ipsum passage, and
              going through the cites of the word in classical literature,
              discovered the undoubtable source. Lorem Ipsum comes from sections
              and of de Finibus Bonorum et Malorum by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet.comes from a line in section
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center min-[1390px]:justify-between gap-10">
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-sm:h-36 max-xl:w-44 max-xl:h-44 w-48 h-48 p-4">
            <img className="w-20 h-20 object-cover" src={bestPriceSvg} alt="" />
            <p className="font-semibold text-center">Best Prices</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-sm:h-36 max-xl:w-44 max-xl:h-44 w-48 h-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={productReturnSvg}
              alt=""
            />
            <p className="font-semibold text-center">Easy Returns</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-sm:h-36 max-xl:w-44 max-xl:h-44 w-48 h-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={greatDealSvg}
              alt=""
            />
            <p className="font-semibold text-center">Great Deal</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-sm:h-36 max-xl:w-44 max-xl:h-44 w-48 h-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={satisfactionSvg}
              alt=""
            />
            <p className="font-semibold text-center">100% Satisfaction</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-sm:h-36 max-xl:w-44 max-xl:h-44 w-48 h-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={onTimeDeliverySvg}
              alt=""
            />
            <p className="font-semibold text-center">On time Delivery</p>
          </div>
        </div>
        <TopicHeading category="Mission" title="Our Principles" />
        <div className="flex gap-10 flex-wrap">
          <div className="sm:flex-1 w-full sm:min-w-72 flex flex-col max-sm:items-center gap-4">
            <img src={missionSvg} className="w-20" alt="" />
            <p className="text-lg font-semibold">Mission</p>
            <p className="text-grayColor">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage
            </p>
          </div>
          <div className="sm:flex-1 w-full sm:min-w-72 flex flex-col max-sm:items-center gap-4">
            <img src={visionSvg} className="w-20" alt="" />
            <p className="text-lg font-semibold">Vision</p>
            <p className="text-grayColor">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage
            </p>
          </div>
          <div className="sm:flex-1 w-full sm:min-w-72 flex flex-col max-sm:items-center gap-4">
            <img src={historySvg} className="w-20" alt="" />
            <p className="text-lg font-semibold">History</p>
            <p className="text-grayColor">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage
            </p>
          </div>
        </div>
      </div>
      <div className="bg-AboutBannerPng bg-cover bg-center w-full">
        <div className="flex justify-center items-center flex-col py-16 px-4 bg-black/50 w-full gap-7">
          <p className="text-4xl text-white max-w-md text-center font-bold">
            weekly special offers on namkeen
          </p>
          <Link to="/namkeen" className="bg-white text-primaryColor hover:bg-primaryColor hover:text-white shadow py-1 px-4 rounded-full">
            shop now
          </Link>
        </div>
      </div>
      <div className="px-4 w-full lg:w-11/12 xl:w-5/6">
        <div className="flex flex-wrap justify-center min-[1390px]:justify-between gap-10">
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-xl:w-44 w-48 p-4">
            <img className="w-20 h-20 object-cover" src={bestPricesOffersSvg} alt="" />
            <p className="font-semibold text-center">Best prices & offers</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-xl:w-44 w-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={freeDeliverySvg}
              alt=""
            />
            <p className="font-semibold text-center">Free delivery</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-xl:w-44 w-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={greatDailyDealSvg}
              alt=""
            />
            <p className="font-semibold text-center">Great daily deal</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-xl:w-44 w-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={wideAssortmentSvg}
              alt=""
            />
            <p className="font-semibold text-center">Wide assortment</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md max-sm:w-36 max-xl:w-44 w-48 p-4">
            <img
              className="w-20 h-20 object-cover"
              src={easyReturnsSvg}
              alt=""
            />
            <p className="font-semibold text-center">Easy returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
