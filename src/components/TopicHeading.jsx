import React from "react";

const TopicHeading = ({ category, title }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <h3 className="text-xl text-primaryColor font-semibold">{category}</h3>
      <h4 className="text-4xl font-bold text-black">{title}</h4>
    </div>
  );
};

export default TopicHeading;
