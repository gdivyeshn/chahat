import React, { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (search) navigate(`/namkeen?search=${search}`);
  };
  return (
    <Popover className="sm:relative">
      {({ open }) => (
        <>
          <Popover.Button className="focus:outline-none flex items-center">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 pt-4 transform w-full sm:w-96 max-sm:px-3">
              <form className="flex gap-2 pr-3 shadow-2xl border border-primaryColor bg-white rounded-md overflow-hidden" onSubmit={handleSearch}>
                <input
                  placeholder="Search Namkeen ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-none focus:border-none py-1 px-3 rounded outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className={search ? "" : "cursor-not-allowed"}
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
              </form>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default HeaderSearch;
