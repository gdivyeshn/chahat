import React, { useEffect, useState } from "react";
import PathChain from "../components/PathChain";
import { BlogAPI } from "../API";
import Loading from "../components/Loading";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  let ignore = false;

  const getBlogs = () => {
    setLoading(true);
    fetch(BlogAPI, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") setBlogs(data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!ignore) {
      getBlogs();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="flex justify-center">
      <div className="px-4 py-8 lg:pb-20 w-full lg:w-11/12 xl:w-5/6">
        <PathChain />
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 max-sm:gap-10 gap-20">
              {blogs.map((item, ind) => (
                <BlogCard item={item} key={ind} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
