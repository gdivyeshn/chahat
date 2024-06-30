import React, { useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Model from "../components/Model";
import { useFormik } from "formik";
import * as yup from "yup";
import InputText from "../components/InputText";
import { CategoryAPI, ImageAPI } from "../API";
import Loading from "../components/Loading";
import DeleteModel from "../components/DeleteModel";
import FloatNotification from "../components/FloatNotification";

const AdminCategories = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  let ignore = false;
  const {
    values,
    errors,
    touched,
    handleChange,
    resetForm,
    handleSubmit,
    setFieldError,
    setFieldValue,
  } = useFormik({
    initialValues: { category_name: "" },
    validationSchema: yup.object().shape({
      category_name: yup.string().required("Category name must be required"),
    }),
    onSubmit: () => {
      isEdit ? updateCategory() : addCategory();
    },
  });
  const addCategory = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setModelLoading(true);
      fetch(`${CategoryAPI}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: values.category_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setModelLoading(false);
            setShowModel(false);
            getAllCategories();
            resetForm();
          } else {
            setFieldError("category_name", data.error);
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
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setCategoryData(data.data);
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
  const updateCategory = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setModelLoading(true);
      fetch(`${CategoryAPI}/update `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: categoryId,
          name: values.category_name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "success") {
            setIsEdit(false);
            getAllCategories();
            resetForm();
          } else {
            setFieldError("category_name", data?.error);
          }
          setShowModel(false);
          setModelLoading(false);
        });
    }
  };
  const deletedCategory = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setModelLoading(true);
      fetch(`${CategoryAPI}/delete `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: categoryId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            getAllCategories();
            setDeleteModal(false);
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
  useEffect(() => {
    if (!ignore) {
      getAllCategories();
    }

    return () => {
      ignore = true;
    };
  }, []);
  const upload = async (name, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", file);
    setModelLoading(true);
    fetch(ImageAPI, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFieldValue(name, data?.url);
        } else {
          setFieldError(name, data?.error);
        }
        setModelLoading(false);
      });
  };
  return (
    <div>
      <div className="sm:flex items-center justify-between mb-4 gap-3">
        <div className="mb-4 lg:mb-0">
          <h3 className="font-bold text-2xl">Category</h3>
          <p>View your current category & summary</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <button
            onClick={() => {
              setShowModel(true);
            }}
            className="bg-primaryColor flex gap-2 items-center hover:bg-lightColor text-white font-bold py-2 px-4 rounded"
          >
            <PlusIcon className="h-5 w-5" />
            Add Category
          </button>
        </div>
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
                          <div className="font-semibold text-center">
                            Action
                          </div>
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
                          <td></td>
                        </tr>
                      ) : categoryData.length > 0 ? (
                        categoryData.map((category, ind) => (
                          <tr key={ind}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{category.name}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex gap-5 justify-center">
                                <button
                                  onClick={() => {
                                    setFieldValue(
                                      "category_name",
                                      category.name
                                    );
                                    setCategoryId(category._id);
                                    setShowModel(true);
                                    setIsEdit(true);
                                  }}
                                >
                                  <PencilIcon className="w-5 h-5 text-gray-800" />
                                </button>
                                <button
                                  onClick={() => {
                                    setCategoryId(category._id);
                                    setDeleteModal(true);
                                  }}
                                >
                                  <TrashIcon className="w-5 h-5 text-primaryColor" />
                                </button>
                              </div>
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
      </div>
      <DeleteModel
        handleDelete={deletedCategory}
        setShowModal={setDeleteModal}
        title={"Delete Category"}
        showModal={deleteModal}
        loading={modelLoading}
      />
      <div>
        <Model
          setShowModel={setShowModel}
          title={isEdit ? "Edit Category" : "Add Category"}
          showModel={showModel}
        >
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <InputText
                type="text"
                id="category_name"
                label="Category Name"
                name="category_name"
                placeholder="Category Name"
                value={values.category_name}
                onChange={handleChange}
                error={
                  errors.category_name && touched.category_name ? true : false
                }
                errorText={errors.category_name}
              />
            </div>
            {modelLoading ? (
              <div className="flex justify-center">
                <div className="h-10 w-20">
                  <Loading />
                </div>
              </div>
            ) : (
              <div className="flex gap-5">
                <button
                  type="submit"
                  className="bg-primaryColor flex gap-2 items-center text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModel(false);
                    if (isEdit) {
                      setIsEdit(false);
                      setCategoryId("");
                    }
                    resetForm();
                  }}
                  className="border border-gray-800 flex gap-2 items-center text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </Model>
      </div>
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default AdminCategories;
