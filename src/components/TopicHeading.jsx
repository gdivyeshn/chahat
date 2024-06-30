import React from "react";

const TopicHeading = ({ category, title }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-2 text-center relative">
      <h3 className="text-xl text-primaryColor font-semibold" style={{textShadow: "0 0 5px #ffffff80"}}>{category}</h3>
      <h4 className="text-4xl font-bold text-black drop-shadow" style={{textShadow: "0 0 5px #ffffff80"}}>{title}</h4>
    </div>
  );
};

export default TopicHeading;
