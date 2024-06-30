import React, { useState } from "react";
import PathChain from "../components/PathChain";
import MapPng from "../images/map.png";
import LocationSvg from "../images/svg/contact-location.svg";
import MailSvg from "../images/svg/contact-mail.svg";
import CallSvg from "../images/svg/contact-call.svg";
import TopicHeading from "../components/TopicHeading";
import InputText from "../components/InputText";
import * as yup from "yup";
import { useFormik } from "formik";
import TextAreaInput from "../components/TextArea";
import { LeadAPI } from "../API";
import { ContextStore } from "../layouts/WebLayout";
import Loading from "../components/Loading";

const ContactUs = () => {
  const { setShowNotification } = ContextStore();
  const [loading, setLoading] = useState(false);
  const { values, touched, errors, resetForm, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone_number: "",
        message: "",
        status: "todo",
        type: "contact",
      },
      validationSchema: yup.object().shape({
        name: yup.string().required("Name must be required"),
        email: yup
          .string()
          .email("Email is not valid")
          .required("Email must be required"),
        phone_number: yup
          .string()
          .matches(/^[0-9]{10}$/, "Phone number is not valid")
          .required("Phone number must be required"),
        message: yup.string().required("Message must be required"),
      }),
      onSubmit: (values) => {
        addLead(values);
      },
    });

  const addLead = async (payload) => {
    setLoading(true);
    fetch(`${LeadAPI}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          resetForm();
          setShowNotification({
            show: true,
            message: <div>Your inquiry sended successfully</div>,
            title: "Inquiry",
            status: "success",
          });
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
    <div className="flex flex-col items-center">
      <div className="px-4 pt-8 w-full lg:w-11/12 xl:w-5/6">
        <PathChain />
      </div>
      <div className="bg-MasalaPng bg-no-repeat flex justify-center w-full mt-10">
        <div className="px-4 py-8 w-full lg:w-11/12 xl:w-5/6 bg-white p-4 flex max-w-7xl">
          <img src={MapPng} alt="" />
        </div>
      </div>
      <div className="bg-FlowerPng bg-right-top bg-no-repeat flex justify-center w-full mt-10">
        <div className="px-4 py-8 w-full lg:w-11/12 xl:w-5/6">
          <TopicHeading category="contact us" title="let’s get in touch!" />
          <div className="flex max-lg:flex-col gap-10 mt-10">
            <div className="flex max-sm:flex-col lg:flex-col gap-2 sm:gap-10 w-full lg:w-1/6 max-lg:order-2">
              <div className="flex sm:flex-col items-center w-full gap-4">
                <img src={LocationSvg} alt="" className="max-sm:w-5" />
                <p className="text-center max-sm:text-left">
                  Akshya Nagar 1st Block 1st Cross, Bangalore-560016
                </p>
              </div>
              <hr />
              <div className="flex sm:flex-col items-center w-full gap-4">
                <img src={MailSvg} alt="" className="max-sm:w-5" />
                <p className="text-center max-sm:text-left">
                  hello@gmail.com
                  <br />
                  hello@gmail.com
                </p>
              </div>
              <hr />
              <div className="flex sm:flex-col items-center w-full gap-4">
                <img src={CallSvg} alt="" className="max-sm:w-5" />
                <p className="text-center max-sm:text-left">
                  (123) 456-7890 <br />
                  (123) 456-7890
                </p>
              </div>
            </div>
            <div className="flex-1 max-lg:order-1">
              <p className="text-lg text-black font-semibold">
                Just Say Hello!
              </p>
              <p className="text-grayColor text-sm max-w-[600px]">
                Do you fancy saying hi to me or you want to get started with
                your project and you need my help? Feel free to contact me.
              </p>
              <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                <div className="flex gap-5 w-full max-sm:flex-col">
                  <InputText
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Person Name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                    errorText={errors.name}
                  />
                  <InputText
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email && touched.email}
                    errorText={errors.email}
                  />
                </div>
                <InputText
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={values.phone_number}
                  onChange={handleChange}
                  error={errors.phone_number && touched.phone_number}
                  errorText={errors.phone_number}
                />
                <TextAreaInput
                  type="text"
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message && touched.message}
                  errorText={errors.message}
                />
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className="rounded-full bg-primaryColor hover:bg-lightColor px-6 py-2 text-white"
                  >
                    Send Message
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
