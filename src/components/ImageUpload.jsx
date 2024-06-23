import React from "react";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

const ImageUplaod = ({ value, setValue, id, name, label, height = "h-96" }) => {
  return (
    <div
      className={`mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden items-center p-4 w-96 ${height}`}
    >
      <input
        id={id}
        name={name}
        type="file"
        className="hidden "
        accept="image/*"
        onChange={(e) => setValue(e.target.files[0])}
      />
      <label
        htmlFor={id}
        id="image-preview"
        className="p-4 bg-gray-100 border-dashed border-2 h-full border-gray-400 rounded-lg flex w-full items-center justify-center mx-auto text-center cursor-pointer"
      >
        <div className="cursor-pointer">
          {value ? (
            <img src={value} alt="img" className={`w-full`} />
          ) : (
            <>
              <div className="flex justify-center">
                <ArrowUpOnSquareIcon className="h-8 w-8 text-gray-500" />
              </div>
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                {label}
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Upload your image
              </p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUplaod;
