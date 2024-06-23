import React, { Fragment } from "react";
import { Calendar } from "react-date-range";
import { Popover, Transition } from "@headlessui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";

function DatePicker({ label, name, onChange, value }) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-gray-800 font-bold">
          {label}
        </label>
      )}
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`group w-full inline-flex items-center rounded-md text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <div
                className={`w-full text-left px-2.5 ${
                  value ? "text-black" : "text-gray-400"
                } border border-gray-300 focus:border-orange-600 py-2 rounded mt-2 outline-none focus:ring-orange-600 :ring-indigo-600`}
              >
                {value ? moment(value).format("DD-MM-YYYY") : "Select Date"}
              </div>
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
              <Popover.Panel className="absolute w-auto left-0 z-10 transform px-4 sm:px-0 shadow-2xl rounded-md overflow-hidden">
                <Calendar
                  onChange={onChange}
                  date={value}
                  color={"#ff972b"}
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default DatePicker;
