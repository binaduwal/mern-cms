import React, { useState } from "react";
import InputField from "../reusables/InputField";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { FaSquarePhoneFlip } from "react-icons/fa6";

const ConsultancyForm = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_num: "",
    destination: "",
    year: "",
    intake: "",
    agreement:"",
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
    if (!form.destination) {
      tempErrors.destination = "Please select a country.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("details recorded");
      console.log("form data:", form);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    <section  className=" grid grid-col-1 md:grid-cols-2 gap-5 md:gap-7 font-jamjure">
      <InputField
      icon={<IoMdPerson/>}
        rounded="rounded-sm"
        type="text"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Name"
        error={errors.full_name}
        required
      />
      <InputField
        rounded="rounded-sm"
        type="email"
        name="email"
        icon={<IoMdMail/>}
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email}
        required
      />
      <InputField
        rounded="rounded-sm"
        type="text"
        name="phone_num"
        
        icon={<FaSquarePhoneFlip/>}
        value={form.phone_num}
        onChange={handleChange}
        placeholder="Phone Number"
        error={errors.phone_num}
        required
      />
      <InputField
        rounded=" rounded-sm"
        type="select"
        name="destination"
        value={form.destination}
        onChange={handleChange}
        options={["Australia", "Canada", "New Zealand", "USA", "UK", "Ireland"]}
        placeholder="Prefered Destination"
        error={errors.destination}
        required
      />
      <InputField
        rounded="rounded-sm"
        type="select"
        name="year"
        value={form.year}
        onChange={handleChange}
        options={["2024", "2025", "2026"]}
        placeholder="Prefered Year"
        error={errors.year}
        required
      />
      <InputField
        rounded="rounded-sm"
        type="select"
        name="intake"
        value={form.intake}
        onChange={handleChange}
        options={["Q1(Jan-Mar)", "Q2(Apr-Jun)", "Q3(Jul-Sept)", "Q4(Oct-Dec)"]}
        placeholder="Prefered Intake"
        error={errors.intake}
        required
      />
      </section>
      <section className=" mt-[3rem] lg:w-[45%] mx-auto" >
      <InputField
        type="checkbox"
        options={["By clicking you agree to our Privacy Policy and Terms & Conditions"]}
        value={form.agreement}
        name="agreement"
        onChange={handleChange}
      />{" "}
      <div className=" sm:w-[50%] mx-auto">
      <button className=" w-full  mt-7 " type="submit" >
        Submit
      </button>
      </div>
      </section>
    </form>
  );
};

export default ConsultancyForm;
