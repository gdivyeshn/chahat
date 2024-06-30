import React, { useEffect, useState } from "react";
import PathChain from "../components/PathChain";
import { useNavigate, useParams } from "react-router-dom";
import { BlogAPI } from "../API";
import { ContextStore } from "../layouts/WebLayout";
import CalendarSvg from "../images/svg/calendar.svg";
// import CommentSvg from "../images/svg/comment.svg";
import moment from "moment";
import MDInput from "../components/MDInput";
import Loading from "../components/Loading";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setShowNotification, recantBlogs } = ContextStore();
  const { id } = useParams();
  const navigate = useNavigate();
  let ignore = false;

  const getBlog = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    fetch(`${BlogAPI}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.status === "success") {
          setBlog(data?.data);
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
    if (!ignore) getBlog();

    return () => {
      ignore = true;
    };
  }, [id]);
  return (
    <div className="flex justify-center">
      <div className="px-4 py-8 lg:pb-20 w-full lg:w-11/12 xl:w-5/6">
        <PathChain />
        <div className="mt-10 flex max-lg:flex-wrap gap-10">
          <div className="max-lg:w-full w-4/6">
            {loading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : (
              <div className="space-y-8">
                <img
                  src={blog?.imgUri}
                  className="aspect-video rounded-2xl"
                  alt=""
                />
                <div className="flex gap-4 text-grayColor text-sm">
                  <div className="flex items-center gap-2">
                    <img src={CalendarSvg} alt="" />
                    <p className="font-semibold">
                      {moment(blog?.date).format("MMM DD YYYY")}
                    </p>
                  </div>
                  {/* {!!blog?.comments?.length && (
                    <div className="flex items-center gap-2">
                      <img src={CommentSvg} alt="" />
                      <p className="font-semibold whitespace-nowrap">
                        {blog?.comments?.length} Comments
                      </p>
                    </div>
                  )} */}
                </div>
                <p className="font-semibold text-xl">{blog?.title}</p>
                <div className="!text-grayColor">
                  <MDInput value={blog?.description} viewOnly />
                </div>
              </div>
            )}
          </div>
          <div className="max-lg:w-full w-2/6 space-y-8">
            <p className="font-semibold">Recently Added</p>
            <div className="space-y-6">
              {recantBlogs.map((item, ind) =>
                item._id === id ? null : (
                  <div
                    key={ind}
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => navigate(`/blogs/${item._id}`)}
                  >
                    <img
                      className="aspect-video w-2/6 rounded object-cover"
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
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
