import React, { useState } from "react";
import InputField from "../reusables/InputField";
import CustomButton from "../reusables/CustomButton";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { MdEventNote} from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";

const CtaBooking = () => {
  const [ctaForm, setCtaForm] = useState({
    full_name: "",
    email: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCtaForm({ ...ctaForm, [name]: value });
  };

  const validate = () => {
    const tempErrors = {};

    if (ctaForm.full_name.length < 5 || ctaForm.full_name.length > 30) {
      tempErrors.full_name = "Last Name must be betwen 5-30 characters.";
    }
    if (ctaForm.subject.length < 5 || ctaForm.subject.length > 20) {
      tempErrors.subject = "Last Name must be betwen 5-20 characters.";
    }

    // Email validation (must end with @gmail.com)
    if (!/^[\w-\.]+@gmail\.com$/.test(ctaForm.email)) {
      tempErrors.email = "Email must end with @gmail.com.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("inqury details:", ctaForm);
    }
  };
  return (
    <section className=" -top-10 z-[2] relative w-[90%] md:w-[73%] 2xl:w-[63%] mx-auto drop-shadow-lg rounded-[4px] bg-white container p-8 lg:p-16 ">
        <form onSubmit={handleSubmit} className=" font-jamjure flex flex-col gap-4 ">
         <section className=" md:flex justify-between items-start gap-4 mb-7">
         <h4 className=" subheading font-jamjure lg:w-[40%] mb-5 lg:mb-0 ">
          NEED ANY HELP SCHEDULE A CONSULTATION.
          </h4>
          <p className=" md:w-[45%] ">Ea amet officia in voluptate eiusmod ipsum aute magna consectetur culpa enim.</p>
         </section>
          <section className=" flex md:flex-row flex-col justify-between gap-4">
          <div className=" relative flex-1">
            <InputField
              rounded="rounded-[4px]"
              placeholder="Name"
              type="text"
              name="full_name"
              value={ctaForm.full_name}
              onChange={handleChange}
            />
            <IoPersonSharp className=" absolute top-[13px] text-zinc-400 text-[1.3rem] right-[13.5px] " />
          </div>

          <div className=" relative flex-1">
            <InputField
              rounded="rounded-[4px]"
              placeholder="Email"
              type="email"
              name="email"
              value={ctaForm.email}
              onChange={handleChange}
            />
            <IoMdMail className=" absolute top-[13px] text-zinc-400 text-[1.3rem] right-[13.5px] " />
          </div>

          <div className=" relative flex-1">
            <InputField
              rounded="rounded-[4px]"
              placeholder="Subject"
              type="text"
              name="subject"
              value={ctaForm.subject}
              onChange={handleChange}
            />
            <MdEventNote className=" absolute top-[13px] text-zinc-400 text-[1.3rem] right-[13.5px] " />
          </div>
          <CustomButton type="submit" icon={<FaTelegramPlane/>} color=" md:w-[18%]">
            Submit
          </CustomButton>
          </section>
          
        </form>
     
    </section>
  );
};

export default CtaBooking;
