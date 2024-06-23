import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ handleChange, value }) => {
  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <input
        value={value}
        className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text"
        name="search"
        placeholder="Search"
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
