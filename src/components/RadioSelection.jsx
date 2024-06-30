import React from "react";

const RadioSelection = ({ types, handleChange, value }) => {

  return (
    <div className="mt-8 flex gap-5">
      {types.map((item, ind) => (
        <div
          key={ind}
          onClick={() => {
            handleChange(item);
          }}
          className={`px-5 border py-2 font-semibold ${
            value.split("-").join("") === item.split("-").join("")
              ? "bg-primaryColor text-white"
              : "text-primaryColor border-primaryColor"
          } rounded-md cursor-pointer hover:bg-primaryColor hover:text-white transition ease-in-out`}
        >
          {item.split("-").join(" ")}
        </div>
      ))}
    </div>
  );
};

export default RadioSelection;
