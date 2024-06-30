import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { CategoryAPI, LeadAPI, ProductAPI } from "../API";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import FloatNotification from "../components/FloatNotification";

const Dashboard = () => {
  let ignore = false;
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [leadsData, setLeadsData] = useState([]);
  const [leadCount, setLeadCount] = useState(0);
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  const cardData = [
    {
      name: "Products",
      total: productCount,
      icon: ShoppingBagIcon,
      link: "/super_admin/dashboard/product",
    },
    {
      name: "Category",
      total: categoryCount,
      icon: SquaresPlusIcon,
      link: "/super_admin/dashboard/category",
    },
    {
      name: "Lead",
      total: leadCount,
      icon: UserCircleIcon,
      link: "/super_admin/dashboard/lead",
    },
  ];
  const [loading, setLoading] = useState(false);
  const getAllProducts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(ProductAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ limit: 5 }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setAllProducts(data.data);
            setProductCount(data?.data?.length);
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };
  const getAllCategories = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(CategoryAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ limit: 5 }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setCategoryData(data.data);
            setCategoryCount(data?.data?.length);
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };
  const getAllLeads = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(LeadAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ type: "contact", limit: 5 }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setLeadsData(data.data);
            setLeadCount(data?.data?.length);
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };

  useEffect(() => {
    if (!ignore) {
      getAllProducts();
      getAllCategories();
      getAllLeads();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div>
      <div className="lg:flex items-center justify-between mb-4 gap-3">
        <div className="mb-4 lg:mb-0">
          <h3 className="font-bold text-2xl">Dashboard Overview</h3>
          <p>View your current sales & summary</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {cardData.map((item, ind) => (
          <div
            key={ind}
            onClick={() => navigate(item?.link)}
            className="hover:bg-primaryColor transition-all duration-200 hover:text-white border cursor-pointer flex items-center justify-between rounded-xl px-5 py-5"
          >
            <div>
              <h6 className="font-semibold text-lg">{item.name}</h6>
              <div className="items-center">
                <p className="text-lg">Total {item?.total}</p>
                <p className="lowercase">{item?.name} you have</p>
              </div>
            </div>
            <div>
              <span className="inline-flex justify-center items-center ml-4">
                <item.icon className="font-semibold h-8 w-8" />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="my-5 space-y-5">
        <section className="flex flex-col justify-center antialiased text-gray-600 ">
          <div className="h-full">
            <div className="w-full mx-auto rounded-lg border border-gray-200">
              <header className="px-5 flex items-center justify-between py-2 border-b border-gray-100">
                <h2 className="w-full font-semibold text-gray-800">Products</h2>
                <div className="w-24">
                  <button
                    className="w-24 p-2.5 flex-1 text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-primaryColor focus:ring-2"
                    onClick={() => {
                      navigate("/super_admin/dashboard/product");
                    }}
                  >
                    View All
                  </button>
                </div>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Category
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Unit</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Stock</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y  divide-gray-300">
                      {loading ? (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center">
                              <div className="w-20">
                                <Loading />
                              </div>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      ) : allProducts.length > 0 ? (
                        allProducts.map((item, ind) => (
                          <tr key={ind}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="rounded-full object-contain h-10 w-10 border border-primaryColor"
                                    src={item.imgUri}
                                    alt="Alex Shatov"
                                  />
                                </div>
                                <div className="font-medium text-gray-800">
                                  {item.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">
                                {item.category.name}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">
                                {item?.unit?.name}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div
                                className={`text-left font-medium ${
                                  item > 3 ? "text-red-500" : "text-green-500"
                                }`}
                              >
                                {item.stock}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center pt-3">
                              No data found in products
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center antialiased text-gray-600 ">
          <div className="h-full">
            <div className="w-full mx-auto rounded-lg border border-gray-200">
              <header className="px-5 flex items-center justify-between py-2 border-b border-gray-100">
                <h2 className="w-full font-semibold text-gray-800">Category</h2>
                <div className="w-24">
                  <button
                    className="w-24 p-2.5 flex-1 text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-primaryColor focus:ring-2"
                    onClick={() => {
                      navigate("/super_admin/dashboard/category");
                    }}
                  >
                    View All
                  </button>
                </div>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y  divide-gray-300">
                      {loading ? (
                        <tr>
                          <td colSpan={2}>
                            <div className="w-full flex justify-center">
                              <div className="w-20">
                                <Loading />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : categoryData.length > 0 ? (
                        categoryData.map((category, ind) => (
                          <tr key={ind}>
                            <td className="w-full p-2 whitespace-nowrap">
                              <div className="text-left">{category.name}</div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>
                            <div className="w-full flex justify-center pt-3">
                              No data found in category
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center antialiased text-gray-600 ">
          <div className="h-full">
            <div className="w-full mx-auto rounded-lg border border-gray-200">
              <header className="px-5 flex items-center justify-between py-2 border-b border-gray-100">
                <h2 className="w-full font-semibold text-gray-800">Lead</h2>
                <div className="w-24">
                  <button
                    className="w-24 p-2.5 flex-1 text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-primaryColor focus:ring-2"
                    onClick={() => {
                      navigate("/super_admin/dashboard/lead");
                    }}
                  >
                    View All
                  </button>
                </div>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y  divide-gray-300">
                      {loading ? (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center">
                              <div className="w-20">
                                <Loading />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : leadsData.length > 0 ? (
                        leadsData.map((lead, ind) => (
                          <tr key={ind}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">
                                  {lead?.name ?? "-"}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">
                                <p>{lead?.email ?? "-"}</p>
                                <p>{lead?.phone_number ?? "-"}</p>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div
                                className={`font-medium text-center ${
                                  (lead?.status === "todo" && "text-red-500") ||
                                  (lead?.status === "in-progress" &&
                                    "text-primaryColor") ||
                                  (lead?.status === "completed" &&
                                    "text-green-500")
                                }`}
                              >
                                {lead?.status ?? "-"}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center pt-3">
                              No data found in leads
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default Dashboard;
