import React, { Fragment, useEffect, useState } from "react";
import PathChain from "../components/PathChain";
import { CategoriesAPI, ProductAPI } from "../API";
import { useParams } from "react-router-dom";
import { ContextStore } from "../layouts/WebLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";
import { Rating } from "react-simple-star-rating";
import filterSvg from "../images/svg/filter.svg";
import { Combobox, Popover, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Namkeen = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { search } = useParams();
  const { setShowNotification } = ContextStore();
  let ignore = false;

  const getAllCategories = () => {
    fetch(CategoriesAPI, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setCategories(data.data);
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
    if (!ignore) {
      getAllCategories();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getAllProducts = () => {
    if (page === 1) setLoading(true);
    fetch(ProductAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        page,
        limit,
        category: selectedCategory?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.status === "success") {
          setAllProducts(
            page === 1 ? data.data : [...allProducts, ...data.data]
          );
          setTotalCount(data.counts);
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
    if (!ignore) {
      getAllProducts();
    }

    return () => {
      ignore = true;
    };
  }, [search, page, limit, selectedCategory]);

  const fetchNextData = () => {
    setPage(page + 1);
  };
  return (
    <div className="flex justify-center">
      <div className="px-4 py-8 lg:pb-20 w-full lg:w-11/12 xl:w-5/6">
        <div className="flex justify-between items-center">
          <PathChain />
          <div className="relative">
            <Combobox
              value={selectedCategory}
              onChange={(v) => {
                setPage(1);
                setSelectedCategory(
                  v._id === selectedCategory?._id ? undefined : v
                );
              }}
            >
              <Combobox.Button className="flex gap-2 items-center rounded-full border border-grayColor shadow px-4 py-1">
                <img src={filterSvg} alt="" className="w-4" />
                Filter
                {/* {selectedCategory && (
                  <XMarkIcon
                    className="w-5 h-5"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedCategory(undefined);
                    }}
                  />
                )} */}
              </Combobox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute right-0 z-50 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {categories.length === 0 ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    categories.map((person) => (
                      <Combobox.Option
                        key={person._id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-primaryColor text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selectedCategory?._id === person._id
                                  ? "font-medium"
                                  : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selectedCategory?._id === person._id ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-primaryColor"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>
        </div>
        <InfiniteScroll
          className="mt-10"
          dataLength={totalCount}
          next={fetchNextData}
          hasMore={allProducts.length < totalCount}
          loader={
            <div className="flex justify-center">
              <Loading />
            </div>
          }
          scrollThreshold={0.5}
        >
          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <div className="grid gap-5 lg:gap-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProducts.map((item, ind) => (
                <div
                  key={ind}
                  className="p-4 space-y-2 rounded-md bg-white shadow-lg font-semibold"
                >
                  <div className="flex justify-center p-4 h-64">
                    <img src={item.imgUri} alt="" />
                  </div>
                  <p className="text-sm text-grayColor">
                    {item?.category?.name}
                  </p>
                  <p>{item?.name}</p>
                  <Rating size={20} initialValue={item?.rating ?? 0} readonly />
                </div>
              ))}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Namkeen;
