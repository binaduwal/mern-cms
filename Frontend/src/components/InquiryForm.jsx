import React, { useState } from "react";
import InputField from "../reusables/InputField";
import { TiLocation } from "react-icons/ti";
import { IoMail } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import { socialLinks } from "../utils/Elements";

const InquiryForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_num: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone_num") {
      if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (form.full_name.length < 5 || form.full_name.length > 25) {
      tempErrors.full_name = "Full Name must be betwen 5-25 characters.";
    }

    if (!/^\d{10}$/.test(form.phone_num)) {
      tempErrors.phone_num = "Phone Number must be 10 digits.";
    }
    if (form.message.length < 15 || form.message.length > 200) {
      tempErrors.message = "Message must be between 15-200 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("details recorded");
      console.log("inquiry data:", form);
    }
  };

  const contactInfo = [
    {
      id: 1,
      title: "Office",
      icon: <TiLocation />,
      detail: "Shankhamul, Kathmandu",
    },
    {
      id: 2,
      title: "Phone",
      icon: <FaSquarePhone />,
      detail: "+977-9810113806",
    },
    {
      id: 3,
      title: "Email",
      icon: <IoMail />,
      detail: "info@sysqube.com",
    },
  ];

  return (
    <section className=" md:flex justify-between gap-12">
      <section className=" rounded-l-md md:w-[50%]">
        <h3 className=" mb-2.5 lg:mb-5 ">Contact Us</h3>
        <p className=" mb-10 sm:w-[95%]">
          Id elit officia cillum cillum irure ut cupidatat eu tempor id officia.
          Elit irure aute aliqua laborum culpa magna. Ut officia tempor est eu
          deserunt.
        </p>
        <section className=" space-y-3 lg:space-y-6 sm:w-[95%] ">
          {contactInfo.map((details) => {
            return (
              <div
                key={details.id}
                className=" flex items-start gap-4 border-b-[3px] border-gray-100 pb-3 px-1"
              >
                <h4 className=" text-[1.6rem] text-indigo-400 ">
                  {details.icon}
                </h4>
                <div>
                  <p className="  font-[500] mb-3 text-indigo-400">
                    {details.title}
                  </p>
                  <h6>{details.detail}</h6>
                </div>
              </div>
            );
          })}
        </section>
        <section className="mt-[2rem] text-center sm:text-left">
          <h5 className=" mb-6">Follow Us</h5>
          <div className=" flex gap-8 items-center justify-center sm:justify-start ">
            {socialLinks.map((item, idx) => {
              return (
                <div className="" key={idx}>
                  <h3 className=" text-indigo-400">{item.icon}</h3>
                </div>
              );
            })}
          </div>
        </section>
      </section>
      <section className=" bg-white drop-shadow-xl mt-[2.5rem] md:mt-0 flex-1 px-7 md:px-10 py-8 md:py-12 border-t-2 border-gray-100 rounded-sm ">
        <h4 className="  mb-4 lg:mb-8 ">Send a Message</h4>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-6 justify-between "
        > 
        <div >
          <p className=" mb-3.5">Name *</p>
          <InputField
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            error={errors.full_name}
          />
          </div>
          <div>
          <p className=" mb-3.5">Number *</p>
          <InputField
            type="text"
            name="phone_num"
            value={form.phone_num}
            onChange={handleChange}
            error={errors.phone_num}
          />
          </div>
          <div>
          <p className=" mb-3.5">Email *</p>
          <InputField
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          </div>
          <div>
          <p className=" mb-3.5">Message *</p>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className={`px-2 py-3 border-2 bg-gray-50 rounded-sm w-full hover:scale-105 duration-300 max-h-[8rem] outline-none  ${
              errors.message ? "border-b-red-600" : "border-b-gray-300"
            }`}
          />
          {errors.message && (
            <span className="text-red-600 text-sm">{errors.message}</span>
          )}
          </div>
          <button type="submit" className=" w-[50%] mx-auto sm:mx-0 ">
            Send Inquiry
          </button>
        </form>
      </section>
    </section>
  );
};

export default InquiryForm;
