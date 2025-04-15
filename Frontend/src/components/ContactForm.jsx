import React from "react";
import ConsultancyForm from "./ConsultancyForm";

const ContactForm = () => {
  const contactItems = [
    {
      title: "Make a Call",
      desc: "Make a call for your general inquiries",
      num: "9810113806",
      icon: "/assets/telephone.png",
    },
    {
      title: "Send a Mail",
      desc: "Send your mail for general enquiries",
      num: "info@sysqube.com",
      icon: "/assets/mail.png",
    },
    {
      title: "Toll Free",
      desc: "Toll free number for students",
      num: "1800-641-1234",
      icon: "/assets/support.png",
    },
  ];
  return (
    <section className=" container">
      <div className=" text-center mb-[2.5rem] ">
        <p className=" mb-4 font-jamjure text-indigo-400">Location</p>
        <h4 className=" mb-6 ">Sankhamul-14, Kathmandu, Nepal</h4>
        <button className=" bg-indigo-400 text-white rounded-lg font-jamjure">CONTACT US</button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3">
        {contactItems.map((item, idx) => {
          return (
            <div
              key={idx}
              className={` flex flex-col border-gray-100 gap-4 lg:gap-5 py-8 border-t-2 text-center ${
                idx < contactItems.length - 1 ? "md:border-r-2" : ""
              }`}
            >  

              <img  className="  mx-auto text-indigo-400 h-[2.5rem] md:h-[3rem]" src={item.icon}/>
              <div>
              <h6 className=" mb-3 subheading">{item.title}</h6>
              <p>{item.desc}</p>
              </div>
              <p className=" text-indigo-400 ">{item.num}</p>
            </div>
          );
        })}
      </div>

      <section className=" bg-white rounded-sm mt-[1.5rem] lg:mt-[3rem] p-8 md:p-12 lg:p-16 drop-shadow-lg border-t-2 border-gray-100">
      <section className=" md:flex justify-between gap-9 items-center mb-8">
       <div className=" flex-1">
       <p className=" mb-4 md:mb-2">Drop a Line</p>
       <h4 className=" subheading font-jamjure mb-4 md:mb-0">SEND YOUR ENQUIRY</h4>
       </div>
       <p className=" md:flex-1 ">Labore tempor excepteur est incididunt velit nisi occaecat cillum veniam id. Nostrud do mollit officia voluptate ex ad. </p>
       </section>
       <ConsultancyForm/>
      </section>
    </section>
  );
};

export default ContactForm;
