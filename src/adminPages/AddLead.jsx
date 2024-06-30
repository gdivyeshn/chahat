import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import InputText from "../components/InputText";
import FloatNotification from "../components/FloatNotification";
import { LeadAPI } from "../API";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import TextAreaInput from "../components/TextArea";
import RadioSelection from "../components/RadioSelection";

const AddLead = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("edit-lead");
  const leadId = new URLSearchParams(location.search).get("id");
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
    resetForm,
    setValues,
    handleChange,
    submitForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
      status: "todo",
      type: "contact",
    },
    validationSchema: yup.object().shape({
      name: yup.string(),
      email: yup.string().email("Email is not valid"),
      phone_number: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone number is not valid"),
      message: yup.string(),
      status: yup.string(),
    }),
    onSubmit: () => {
      isEdit ? updateLead() : addLead();
    },
  });
  const getSingleLead = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${LeadAPI}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: leadId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setValues({
              name: data?.data?.name,
              email: data?.data?.email,
              phone_number: data?.data?.phone_number,
              message: data?.data?.message,
              status: data?.data?.status,
              type: data?.data?.type,
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
  const addLead = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${LeadAPI}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone_number: values.phone_number,
          message: values.message,
          status: values.status,
          type: values.type,
          is_notification: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            resetForm();
            navigate("/super_admin/dashboard/lead");
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
    }
  };
  const updateLead = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(`${LeadAPI}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: leadId,
          name: values.name,
          email: values.email,
          phone_number: values.phone_number,
          message: values.message,
          status: values.status,
          type: values.type,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            resetForm();
            navigate("/super_admin/dashboard/lead");
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
    }
  };

  useEffect(() => {
    if (!ignore && isEdit) getSingleLead();
    return () => {
      ignore = true;
    };
  }, [isEdit]);
  const showErr = () => {
    if (Object.keys(errors)[0]) {
      setShowNotification({
        show: true,
        status: "failed",
        title: "Validation Failed",
        message: (
          <div>
            {Object.keys(errors).map((i, ind) => (
              <p key={ind}>
                {ind + 1}. {errors[i]}
              </p>
            ))}
          </div>
        ),
      });
    } else submitForm();
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            {isEdit ? "Edit Lead" : "Add Lead"}
          </h3>
          <p>{isEdit ? "Edit" : "Add"} your current lead & summary</p>
        </div>
        <div>
          <button
            className="w-24 mt-2 p-2.5 flex-1 text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white transition ease-in-out rounded-md outline-none ring-offset-2 ring-primaryColor focus:ring-2"
            onClick={() => navigate("/super_admin/dashboard/lead")}
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
          <RadioSelection
            types={["to-do", "in-progress", "completed"]}
            value={values.status}
            handleChange={(value) => {
              setFieldValue("status", value);
            }}
          />
          <div className="md:flex gap-5 w-full mt-8">
            <div className="w-full">
              <InputText
                type="text"
                id="name"
                label="Name"
                name="name"
                placeholder="Person Name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <InputText
                type="text"
                id="email"
                label="Email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex gap-5 w-full mt-8">
            <div className="w-full">
              <InputText
                type="number"
                id="phone_number"
                label="Phone Number"
                name="phone_number"
                placeholder="Phone Number"
                value={values.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex gap-5 w-full mt-8">
            <div className="w-full">
              <TextAreaInput
                type="text"
                id="message"
                label="Message"
                name="message"
                placeholder="Message"
                value={values.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex mt-8 gap-5 ">
            <button
              type="submit"
              className="text-center w-full bg-primaryColor gap-2 items-center hover:bg-lightColor text-white font-bold py-[9px] px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/super_admin/dashboard/lead")}
              type="button"
              className="text-center w-full border border-primaryColor gap-2 items-center text-primaryColor font-bold py-[9px] px-4 rounded"
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

export default AddLead;
