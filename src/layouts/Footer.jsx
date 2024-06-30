import React, { useState } from "react";
import FacebookSvg from "../images/svg/facebook.svg";
import TwitterSvg from "../images/svg/twitter.svg";
import LinkedinSvg from "../images/svg/linkedin.svg";
import InstagramSvg from "../images/svg/instagram.svg";
import LocationSvg from "../images/svg/location.svg";
import MobileSvg from "../images/svg/mobile.svg";
import MailSvg from "../images/svg/mail.svg";
import CalendarSvg from "../images/svg/calendar.svg";
import TelegramSvg from "../images/svg/telegram.svg";
import { ContextStore } from "./WebLayout";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { LeadAPI } from "../API";

const Footer = () => {
  const { recantProducts, recantBlogs, setShowNotification } = ContextStore();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const SocialMedia = [
    { icon: FacebookSvg, href: "/" },
    { icon: TwitterSvg, href: "/" },
    { icon: LinkedinSvg, href: "/" },
    { icon: InstagramSvg, href: "/" },
  ];
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    fetch(`${LeadAPI}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, type: "subscribe" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setShowNotification({
            show: true,
            message: <div>Your inquiry sended successfully</div>,
            title: "Inquiry",
            status: "success",
          });
          setEmail("");
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
  return (
    <div className="bg-footerImg bg-cover text-grayColor flex justify-center">
      <div className="px-4 py-8 lg:py-20 w-full lg:w-11/12 xl:w-5/6">
        <div className="flex gap-10 max-sm:flex-col text-sm">
          <div className="flex gap-10 flex-1 max-lg:flex-col">
            <div className="flex-1">
              <div className="w-fit">
                <p className="text-2xl font-bold text-white">about chahat</p>
                <hr className="bg-gradient-to-r from-primaryColor to-transparent to-70% h-1 border-none" />
                <p className="mt-10 max-md:mt-5">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less.
                </p>
                <div className="flex gap-3 mt-10 max-md:mt-5">
                  {SocialMedia.map((item, ind) => (
                    <a
                      key={ind}
                      className="bg-[#1C2125] p-3 w-10 h-10 flex justify-center items-center rounded-full shadow-md"
                      href={item.href}
                    >
                      <img src={item.icon} alt="" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-fit">
                <p className="text-2xl font-bold text-white">our products</p>
                <hr className="bg-gradient-to-r from-primaryColor to-transparent to-70% h-1 border-none" />
                <ul className="mt-10 max-md:mt-5 list-disc pl-6 space-y-6 max-md:space-y-3">
                  {recantProducts.map((item, ind) => (
                    <li
                      key={ind}
                      className="cursor-pointer"
                      onClick={() => navigate(`/namkeen?search=${item.name}`)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex gap-10 flex-1 max-lg:flex-col">
            <div className="flex-1">
              <div className="w-fit">
                <p className="text-2xl font-bold text-white">recant post</p>
                <hr className="bg-gradient-to-r from-primaryColor to-transparent to-70% h-1 border-none" />
                <div className="mt-10 space-y-6 max-md:mt-5 max-md:space-y-3">
                  {recantBlogs.slice(0, 2).map((item, ind) => (
                    <div
                      key={ind}
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={() => navigate(`/blogs/${item._id}`)}
                    >
                      <img
                        className="aspect-square w-16 rounded object-cover"
                        src={item.imgUri}
                        alt=""
                      />
                      <div>
                        <p className="line-clamp-2">{item.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <img src={CalendarSvg} alt="" />
                          <p>{moment(item.date).format("MMM DD YYYY")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-fit">
                <p className="text-2xl font-bold text-white">Contact Now</p>
                <hr className="bg-gradient-to-r from-primaryColor to-transparent to-70% h-1 border-none" />
                <div className="mt-10 space-y-6 max-md:mt-5 max-md:space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="bg-primaryColor p-3 w-10 h-10 flex justify-center items-center rounded-full">
                      <img src={LocationSvg} alt="" />
                    </div>
                    <p>
                      a-1, 301 polaris mall <br />
                      surat cenal
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primaryColor p-3 w-10 h-10 flex justify-center items-center rounded-full">
                      <img src={MobileSvg} alt="" />
                    </div>
                    <p>0(123) 1345 89756</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primaryColor p-3 w-10 h-10 flex justify-center items-center rounded-full">
                      <img src={MailSvg} alt="" />
                    </div>
                    <p>hello@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 max-md:mt-5 text-white">
          <div className="bg-[#1C2125] py-3 px-6 flex justify-between items-center rounded-xl shadow-md max-md:flex-col gap-5">
            <div className="text-3xl max-sm:text-2xl font-bold">
              Subscription News
            </div>
            <form
              onSubmit={handleSubmitEmail}
              className="flex rounded-md overflow-hidden max-sm:text-xs"
            >
              <input
                type="email"
                className="placeholder:text-gray-400 px-4 bg-[#0E1317] focus-visible:outline-none"
                placeholder="Enter Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center gap-3 bg-primaryColor p-4 max-sm:p-2"
              >
                SUBSCRIBE <img src={TelegramSvg} className="w-4" alt="" />
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-3 text-grayColor max-sm:text-xs">
          <div>Privacy Policy</div>
          <div className="border-2" />
          <div>Terms & Condition</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
