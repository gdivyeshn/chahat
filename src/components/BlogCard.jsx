import React from "react";
import CalendarSvg from "../images/svg/calendar.svg";
// import CommentSvg from "../images/svg/comment.svg";
import RightUpArrowSvg from "../images/svg/right-up-arrow.svg";
import moment from "moment";
import { Link } from "react-router-dom";
import MDInput from "../components/MDInput";

const BlogCard = ({ item }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <img src={item.imgUri} className="aspect-video" alt="" />
      <div className="px-6 py-4 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="flex gap-4 text-grayColor text-sm">
            <div className="flex items-center gap-2">
              <img src={CalendarSvg} alt="" />
              <p className="font-semibold">
                {moment(item.date).format("MMM DD YYYY")}
              </p>
            </div>
            {/* {!!item.comments?.length && (
                <div className="flex items-center gap-2">
                <img src={CommentSvg} alt="" />
                <p className="font-semibold whitespace-nowrap">
                    {item.comments?.length} Comments
                </p>
                </div>
            )} */}
          </div>
          <p className="font-semibold line-clamp-2">{item.title}</p>
          <div className="text-grayColor text-sm line-clamp-2">
            <MDInput value={item.description} viewOnly />
          </div>
        </div>
        <div className="space-y-4">
          <hr className="border-grayColor" />
          <Link
            to={`/blogs/${item._id}`}
            className="text-[#4D5765] flex gap-1 text-sm"
          >
            READ MORE <img className="w-2" src={RightUpArrowSvg} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
