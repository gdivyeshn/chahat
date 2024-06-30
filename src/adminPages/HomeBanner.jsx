import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import InputText from "../components/InputText";
import FloatNotification from "../components/FloatNotification";
import { ImageAPI, OtherDetailsAPI } from "../API";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import MDInput from "../components/MDInput";

const HomeBanner = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  let ignore = false;
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  const {
    values,
    handleChange,
    setFieldValue,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      imgUri: "",
      description: "",
      link: "",
    },
    onSubmit: () => {
      updateData();
    },
  });

  const getSingleData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${OtherDetailsAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ type: "home-banner" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setValues(data?.data);
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
      getSingleData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const updateData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${OtherDetailsAPI}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          type: "home-banner",
          ...values,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setLoading(false);
            setEdit(false);
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

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            {edit ? "Edit" : "View"} Home Banner Details
          </h3>
          <p>{edit ? "Edit" : "View"} your current home banner & details</p>
        </div>
        <div>
          <button
            className="w-24 mt-2 p-2.5 flex-1 text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-primaryColor focus:ring-2"
            onClick={() => navigate(-1)}
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
        <div className="space-y-5">
          <div
            className={`w-full flex flex-col lg:flex-row lg:items-center lg:gap-5`}
          >
            <div className="w-full mt-8">
              <ImageUpload
                value={values.imgUri ?? ""}
                setValue={(e) => {
                  upload("imgUri", e);
                }}
                name="imgUri"
                label="Upload Banner Image"
                id="imgUri"
                disabled={!edit}
              />
            </div>
            <div className="w-full space-y-5">
              <InputText
                type="text"
                id="title"
                label="Title"
                name="title"
                placeholder="Title"
                value={values?.title ?? ""}
                onChange={handleChange}
                disabled={!edit}
              />
              <InputText
                type="text"
                id="link"
                label="Link"
                name="link"
                placeholder="link"
                value={values?.link ?? ""}
                onChange={handleChange}
                disabled={!edit}
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
              viewOnly={!edit}
            />
          </div>

          <div className="flex gap-5 ">
            {!edit ? (
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="text-center w-full bg-primaryColor gap-2 items-center hover:bg-lightColor text-white font-bold py-[9px] px-4 rounded"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-center w-full bg-primaryColor gap-2 items-center hover:bg-lightColor text-white font-bold py-[9px] px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEdit(false)}
                  type="button"
                  className="text-center w-full border border-primaryColor gap-2 items-center text-primaryColor font-bold py-[9px] px-4 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default HomeBanner;
