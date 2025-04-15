import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const footerHead = [
    {
      id: 1,
      title: "About Us",
      footerList: [
        {
          name: "Why choose Consultancy",
          path: "",
        },
        {
          name: "What we do",
          path: "",
        },
        {
          name: "Study abroad counselling",
          path: "",
        },
        {
          name: "Careers",
          path: "",
        },
      ],
    },
    {
      id: 2,
      title: "Our Branches",
      footerList: [
        {
          name: "Kathmandu",
          path: "",
        },
        {
          name: "Pokhara",
          path: "",
        },
        {
          name: "Chitwan",
          path: "",
        },
      ],
    },
    {
      id: 3,
      title: "Study Destinations",
      footerList: [
        {
          name: "Canada",
          path: "",
        },
        {
          name: "Australia",
          path: "",
        },
        {
          name: "UK",
          path: "",
        },
        {
          name: "USA",
          path: "",
        },
        {
          name: "New Zealand",
          path: "",
        },
      ],
    },
    {
      id: 4,
      title: "Our Services",
      footerList: [
        {
          name: "Meet us Online",
          path: "",
        },
        {
          name: "Admision Counselling",
          path: "",
        },
        {
          name: "Student Visa Service",
          path: "",
        },
      ],
    },
  ];

  const socialLinks = [
    {
      id: 10,
      icons: <FaFacebookF />,
      link: "",
    },
    {
      id: 20,
      icons: <FaLinkedinIn />,
      link: "",
    },
    {
      id: 30,
      icons: <BsInstagram />,
      link: "",
    },
    {
      id: 40,
      icons: <IoLogoYoutube />,
      link: "",
    },
  ];
  return (
    <section className="bg-[#1c1f2a] lg:pt-12">
      <section className="container lg:flex justify-between items-start gap-8 md:gap-16 pt-10">
        <section className=" mx-0 flex flex-row lg:flex-col gap-7 lg:gap-8 justify-between lg:justify-start">
          <div>
            <h4 className="text-white mb-4">LOGO</h4>
            <p className=" text-white text-sm">
              Study abroad consultants
            </p>
          </div>
          <section>
          <h5 className="text-white mb-4 text-right sm:text-left">Let's get social.</h5>
          <div className="flex gap-5">
            {socialLinks.map((item) => (
              <h3 key={item.id} className="text-[1.2rem] text-white">
                {item.icons}
              </h3>
            ))}
          </div>
          </section>
        </section>

        <section className="grid mt-[3rem] lg:mt-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-6 flex-1 text-white">
          {footerHead.map((itemHead,idx) => (
            <div key={itemHead.id} className={`${idx%2 && "text-right sm:text-left"} space-y-2  `}>
              <h6 className="mb-6 text-white">
                {itemHead.title}
              </h6>
              {itemHead.footerList.map((itemList, idx) => (
                <p
                  key={idx}
                  className="leading-relaxed text-stone-300 caption"
                >
                  {itemList.name}
                </p>
              ))}
            </div>
          ))}
        </section>
      </section>

      <section className="container mt-8">
        <div className="border-t-2 border-stone-600 text-center pt-6 pb-2">
          <p className="text-white text-sm lg:text-base leading-loose md:leading-none">
            Copyright ©️ 2024 consultancy.
            <span className="text-stone-400 ml-4">
              Useful Links | Glossary | Terms of Use | Privacy Policy
            </span>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Footer;
