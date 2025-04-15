import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

const Contact = () => {
 
  const socialLinks = [
    {
      id: 10,
      icon: <IoMailOutline size={20}/>,
      title: "contact@consultancy.com",
    },
    {
      id: 30,
      icon: <LuPhone size={18}/>,
      title: "+977-9810634234",
    },
  ];
  return (
    <section className=" relative mt-[2rem] lg:mt-[4rem]">
      <section className=" bg-gradient-to-r from-indigo-400 to-indigo-300">
        <section className=" flex container justify-between items-center py-4 lg:py-6">
          <div className=" lg:w-[40%] space-y-6 ">
            <h1 className=" text-white">Contact Us</h1>
            <h3 className=" text-white">
              Lets talk about your prefered country to study. Send us a message
              and we will be in touch within one business day.
            </h3>
            <section className=" flex gap-4">
            {
              socialLinks.map((item)=>{
                return(
                  <div className="flex items-center gap-x-1.5 border-b-[1.5px] border-gray-300 py-1" key={item.id}>
                   <h2 className=" text-gray-100">{item.icon}</h2>
                   <p className=" font-[500] text-gray-100">{item.title}</p>
                  </div>
                )
              })
            }
            </section>
          </div>
          <section className=" hidden lg:block lg:relative ">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-3483601-2912018.png"
              alt="contact"
              className=" h-[16rem]"
            />
          </section>
        </section>
      </section>
    </section>
  );
};

export default Contact;
