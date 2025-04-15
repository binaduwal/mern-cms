import React from "react";
import InfoBar from "../reusables/InfoBar";
import InquiryForm from "../components/InquiryForm";

const ContactUs = () => {
  return (
    <>
      <InfoBar title="Contact Us" parentpath="Home" childpath="Contact" />
      <section className=" py-[1.5rem] md:py-[4.5rem] md:bg-gradient-to-r from-white from-70% to-indigo-400 to-30%">
        <div className="container py-[24px] w-full">
          <InquiryForm />
        </div>
      </section>
      <section className=" p-1 ">
        <iframe
          className=" grayscale"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.4672974325404!2d85.32924310942313!3d27.681385826539696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c757b96f8f%3A0x3e02763a2f6ff4e6!2sSysQube%20Technology%20Pvt.Ltd.!5e0!3m2!1sen!2snp!4v1727345847353!5m2!1sen!2snp"
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default ContactUs;
