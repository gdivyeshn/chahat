import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import InputText from "../components/InputText";
import FloatNotification from "../components/FloatNotification";
import { ImageAPI, BlogAPI } from "../API";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import { Rating } from "@material-tailwind/react";
import MDInput from "../components/MDInput";
import DatePicker from "../components/DatePicker";
import { TrashIcon } from "@heroicons/react/24/outline";
import TextAreaInput from "../components/TextArea";

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit-blog");
  const blogId = new URLSearchParams(location.search).get("id");
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
      title: "",
      date: new Date(),
      imgUri: "",
      description: "",
      comments: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Blog title must be required"),
      imgUri: yup.string().required("Image must be required"),
      description: yup.string().required("Description must be required"),
      comments: yup.array().of(
        yup.object().shape({
          date: yup.string().required("select the comment date"),
          comment: yup.string().required("Comment not be empty"),
        })
      ),
    }),
    onSubmit: () => {
      isEdit ? updateBlog() : addBlog();
    },
  });

  const getSingleBlog = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${BlogAPI}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: blogId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setValues({
              imgUri: data?.data?.imgUri,
              title: data?.data?.title,
              date: data?.data?.date ?? "",
              description: data?.data?.description ?? "",
              comments: data?.data?.comments ?? "",
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
      getSingleBlog();
    }

    return () => {
      ignore = true;
    };
  }, [isEdit]);

  const addBlog = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${BlogAPI}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          imgUri: values.imgUri,
          title: values.title,
          date: values.date,
          description: values.description,
          comments: values.comments,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            resetForm();
            navigate("/super_admin/dashboard/blog");
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
  const updateBlog = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${BlogAPI}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: blogId,
          imgUri: values.imgUri,
          title: values.title,
          date: values.date,
          description: values.description,
          comments: values.comments,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            resetForm();
            navigate("/super_admin/dashboard/blog");
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
      Object.keys(errors)[0] && nestedError(errAry, errors);
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
    } else {
      submitForm();
    }
  };
  const nestedError = (errAry, nestedErrorAry) => {
    return Object.keys(nestedErrorAry).map((i) =>
      typeof nestedErrorAry[i] === "string"
        ? errAry.push(nestedErrorAry[i])
        : nestedError(errAry, nestedErrorAry[i])
    );
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    setFieldValue("comments", [
      ...values.comments,
      { date: new Date(), comment: "" },
    ]);
  };
  const handleRemoveComment = (index) => {
    setFieldValue(
      "comments",
      values.comments.filter((v, i) => index !== i)
    );
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            {isEdit ? "Edit Blog" : "Add Blog"}
          </h3>
          <p>{isEdit ? "Edit" : "Add"} your current blogs & summary</p>
        </div>
        <div>
          <button
            className="w-24 mt-2 p-2.5 flex-1 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-orange-600 focus:ring-2"
            onClick={() => navigate("/super_admin/dashboard/blog")}
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
          className="space-y-5"
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
                label="Upload Blog Image"
                id="imgUri"
              />
            </div>
            <div className="w-full space-y-5">
              <InputText
                type="text"
                id="title"
                label="Title"
                name="title"
                placeholder="Blog Title"
                value={values?.title ?? ""}
                onChange={handleChange}
              />
              <DatePicker
                label="Date"
                value={values.date}
                onChange={(date) => setFieldValue("date", date)}
                name="date"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-bold">Description</label>
            <MDInput
              value={values?.description}
              onChange={(value) => {
                setFieldValue("description", value);
              }}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="block text-gray-800 font-bold">Comments</label>
              <button
                onClick={handleAddComment}
                type="button"
                className="text-center bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 rounded"
              >
                Add
              </button>
            </div>
            {values.comments.map((comment, ind) => (
              <div key={ind}>
                <div className="flex justify-between items-center">
                  <DatePicker
                    value={comment.date}
                    onChange={(date) =>
                      setFieldValue(`comments.${ind}.date`, date)
                    }
                    name="date"
                  />
                  <TrashIcon
                    onClick={() => handleRemoveComment(ind)}
                    className="w-5 h-5 text-red-500 hover:text-red-600"
                  />
                </div>
                <TextAreaInput
                  type="text"
                  id={`comments.${ind}.comment`}
                  name={`comments.${ind}.comment`}
                  placeholder="Comment"
                  value={comment.comment}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-5 ">
            <button
              type="submit"
              className="text-center w-full bg-orange-400 gap-2 items-center hover:bg-orange-500 text-white font-bold py-[9px] px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/super_admin/dashboard/blog")}
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

export default AddBlog;
