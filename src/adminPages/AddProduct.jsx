import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import InputText from "../components/InputText";
import Selection from "../components/Selection";
import FloatNotification from "../components/FloatNotification";
import { CategoryAPI, ImageAPI, ProductAPI } from "../API";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import { Rating } from "@material-tailwind/react";

const AddProduct = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit-product");
  const productId = new URLSearchParams(location.search).get("id");
  let ignore = false;
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  const {
    values,
    errors,
    handleChange,
    resetForm,
    setFieldValue,
    setValues,
    submitForm,
  } = useFormik({
    initialValues: {
      name: "",
      category: "",
      imgUri: "",
      rating: 0,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Product name must be required"),
      imgUri: yup.string().required("Image must be required"),
      rating: yup.number().min(1, "Rating must be required"),
    }),
    onSubmit: () => {
      isEdit ? updateProduct() : addProduct();
    },
  });

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
            setAllCategories(data.data);
            setFieldValue("category", data.data[0]._id);
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
  const getSingleProduct = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${ProductAPI}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: productId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setValues({
              imgUri: data?.data?.imgUri,
              rating: data?.data?.rating,
              name: data?.data?.name ?? "",
              category: data?.data?.category?._id,
            });
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
    if (!ignore && isEdit) {
      getSingleProduct();
    }

    return () => {
      ignore = true;
    };
  }, [isEdit]);

  const addProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${ProductAPI}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: values.name,
          category: values.category,
          imgUri: values.imgUri,
          rating: values.rating,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            resetForm();
            navigate("/super_admin/dashboard/product");
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
  const updateProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${ProductAPI}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: productId,
          name: values.name,
          category: values.category,
          imgUri: values.imgUri,
          rating: values.rating,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            resetForm();
            navigate("/super_admin/dashboard/product");
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
  const upload = async (name, file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", file);
    setLoading(true);
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
          setShowNotification({
            show: true,
            message: <div>{data.error}</div>,
            title: "Backend Error",
            status: "failed",
          });
        }
        setLoading(false);
      });
  };

  const showErr = () => {
    let errAry = [];
    if (Object.keys(errors)[0]) {
      Object.keys(errors)[0] &&
        Object.keys(errors).map((i) => errAry.push(errors[i]));
    }
    if (errAry.length > 0) {
      setShowNotification({
        show: true,
        status: "failed",
        title: "Validation Failed",
        message: (
          <div>
            {errAry.map((i, ind) => (
              <p key={ind}>
                {ind + 1}. {i}
              </p>
            ))}
          </div>
        ),
      });
    } else submitForm();
  };
  useEffect(() => {
    if (!ignore) {
      getAllCategories();
    }
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            {isEdit ? "Edit Products" : "Add Products"}
          </h3>
          <p>{isEdit ? "Edit" : "Add"} your current products & summary</p>
        </div>
        <div>
          <button
            className="w-24 mt-2 p-2.5 flex-1 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-orange-600 focus:ring-2"
            onClick={() => navigate("/super_admin/dashboard/product")}
          >
            Back
          </button>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex justify-center">
          <div className="w-20">
            <Loading />
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showErr();
          }}
        >
          <div
            className={`w-full flex flex-col lg:flex-row ${
              values.imgUri ? "lg:items-center" : "lg:items-center"
            } lg:gap-5`}
          >
            <div className="w-full mt-8">
              <ImageUpload
                value={values.imgUri ?? ""}
                setValue={(e) => {
                  upload("imgUri", e);
                }}
                name="imgUri"
                label="Upload Product Image"
                id="imgUri"
              />
            </div>
            <div className="w-full space-y-5">
              <div className="w-full">
                <InputText
                  type="text"
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Product Name"
                  value={values?.name ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Selection
                  label="Select Category"
                  name="category"
                  option={allCategories}
                  displayValue={(e) => {
                    return e.name;
                  }}
                  value={
                    allCategories?.find((c) => c?._id === values?.category) ??
                    ""
                  }
                  onChange={(e) => {
                    setFieldValue("category", e._id);
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-800 font-bold">Rating</label>
                <Rating
                  value={values.rating}
                  onChange={(e) => setFieldValue("rating", e)}
                  ratedColor="orange"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-8 gap-5 ">
            <button
              type="submit"
              className="text-center w-full bg-orange-400 gap-2 items-center hover:bg-orange-500 text-white font-bold py-[9px] px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/super_admin/dashboard/product")}
              type="button"
              className="text-center w-full border border-orange-400 gap-2 items-center text-orange-500 font-bold py-[9px] px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default AddProduct;
