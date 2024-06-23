import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { LeadAPI } from "../API";
import Loading from "../components/Loading";
import DeleteModel from "../components/DeleteModel";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import FloatNotification from "../components/FloatNotification";
import SearchBar from "../components/SearchBar";
import useDebouncedValue from "../components/Debounce";

const AdminLeads = () => {
  let ignore = false;
  const [loading, setLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [deleteModal, setDeleteModel] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const navigate = useNavigate();
  const [leadId, setLeadId] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebouncedValue(search, 500);
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
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
        body: JSON.stringify({ search, type: "contact" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setLeadsData(data.data);
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
      getAllLeads();
    }

    return () => {
      ignore = true;
    };
  }, [debouncedSearchTerm]);
  const deleteLead = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setModelLoading(true);
      fetch(`${LeadAPI}/delete `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: leadId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setDeleteModel(false);
            setLeadId("");
            getAllLeads();
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
          setModelLoading(false);
        });
    }
  };
  return (
    <div>
      <div className="sm:flex items-center justify-between mb-4 gap-3">
        <div className="mb-4 lg:mb-0">
          <h3 className="font-bold text-2xl">Lead</h3>
          <p>View your lead & summary</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <button
            onClick={() => {
              navigate("./add-lead");
            }}
            className="bg-orange-400 flex gap-2 items-center hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
          >
            <PlusIcon className="h-5 w-5" />
            Add Lead
          </button>
        </div>
      </div>
      <div>
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
          }}
        />
      </div>
      <div className="my-5">
        <section className="flex flex-col justify-center antialiased text-gray-600 ">
          <div className="h-full">
            <div className="w-full mx-auto rounded-lg border border-gray-200">
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
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Message</div>
                        </th>
                        <th>
                          <div className="font-semibold text-center">
                            Action
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
                          <td></td>
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
                                    "text-orange-500") ||
                                  (lead?.status === "completed" &&
                                    "text-green-500")
                                }`}
                              >
                                {lead?.status ?? "-"}
                              </div>
                            </td>
                            <td className="p-2">
                              <div
                                className={`text-left font-medium line-clamp-2`}
                              >
                                {lead?.message ?? "-"}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="gap-5 flex justify-center">
                                <button
                                  onClick={() => {
                                    navigate(`./edit-lead?id=${lead._id}`);
                                  }}
                                >
                                  <PencilIcon className="w-5 h-5 text-orange-500 hover:text-orange-600" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteModel(true);
                                    setLeadId(lead._id);
                                  }}
                                >
                                  <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-600" />
                                </button>
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
      <DeleteModel
        handleDelete={deleteLead}
        setShowModal={setDeleteModel}
        title={"Delete Lead"}
        showModal={deleteModal}
        loading={modelLoading}
      />
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default AdminLeads;
