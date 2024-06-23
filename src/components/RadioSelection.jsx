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
              ? "bg-orange-500 text-white"
              : "text-orange-500 border-orange-500"
          } rounded-md cursor-pointer hover:bg-orange-500 hover:text-white transition ease-in-out`}
        >
          {item.split("-").join(" ")}
        </div>
      ))}
    </div>
  );
};

export default RadioSelection;
