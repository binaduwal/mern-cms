import React from "react";
import Destinations from "../components/Destinations";
import InfoBar from "../reusables/InfoBar";
import { FaCheck, FaQuoteLeft } from "react-icons/fa";
import SuccessStory from "../components/SuccessStory";

const StudyAbroad = () => {

  const details1 = [
    {
      title: "Clutural Exposure:",
      desc: "Gain global perspectives and immerse in new cultures.",
    },
    {
      title: "Quality Education:",
      desc: "Access to top institutions & innovative learning environments.",
    },
    {
      title: "Career Opportunities:",
      desc: "Enhance employability with an international degree.",
    },
  ];

  const listItems = [
    {
      title: "95% success rates",
    },
    {
      title: "Quality of Life",
    },
    {
      title: "Easy & fast process",
    },
    {
      title: "Better Opportunities",
    },
    {
      title: "Affordable fees",
    },
    {
      title: " Job Guarantee",
    },
  ];
  const successItems = [
    {
      icon: "/assets/visa.png",
      num: "90%",
      desc: "Visa Process Success Rate",
    },
    {
      icon: "/assets/apply.png",
      num: 900,
      desc: "Total Application Approved",
    },
  ];

 

  return (
    <section className=" mb-4 lg:mb-8 ">
      <InfoBar title="Study Abroad" parentpath="Home" childpath="Abroad" />
      <section className=" md:flex justify-between container gap-8 items-end mt-[2rem] md:mt-[4rem]">
        <div className=" relative flex gap-4 md:gap-0 items-end md:w-[50%] group">
          <img
            src="https://blog.oncallinternational.com/wp-content/uploads/2015/12/study-abroad.jpg"
            className=" object-cover h-[8rem] md:h-[14.5rem] md:w-[55%] rounded-md relative z-[2] drop-shadow-md"
          />
          <div className="hidden md:block absolute bg-indigo-400 w-[1.1rem] rounded-lg h-[5.5rem] z-[5] right-14 -top-[16.4rem]">
            <p className=" hidden">hello</p>
          </div>
          <img
            src="https://i.pinimg.com/originals/b3/62/c9/b362c92f978c26f899f672748b7b051a.jpg"
            className=" object-cover object-top h-[8rem] md:h-[29.5rem] brightness-90 w-full md:w-[65%] relative md:absolute rounded-md md:bottom-6 md:right-24 "
          />
          <div className="hidden md:block p-5 bg-indigo-400 rounded-full w-fit absolute bottom-[12rem] right-[36%] z-[3]  ">
            <img
              src="/assets/airplane2.png"
              className=" object-cover object-top size-[3.5rem]   "
            />
          </div>
        </div>
        <section className=" flex-1 mt-[2rem] md:mt-0">
          <p className=" caption mb-3 text-indigo-400">GET TO KNOW US</p>
          <h3 className=" mb-6  md:w-[70%] leading-snug">
            Company Offering all Visa & Immigration Services
          </h3>
          <p className=" mb-8 md:w-[80%]">
            The SysQube offers comprehensive services for students aspiring to
            study abroad. We provide expert guidance, from initial counselling
            to post-arrival support, ensuring a seamless transition to
            international education.
          </p>
          <div className=" space-y-3 ">
            {details1.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className=" flex items-center gap-4">
                    <FaCheck className=" text-indigo-400 text-[1rem]" />
                    <h6>{item.desc}</h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" flex gap-10 mt-10">
            {successItems.map((item, idx) => {
              return (
                <div key={idx} className=" flex flex-col gap-1.5 text-center sm:text-left ">
                  <img
                    src={item.icon}
                    alt="visa"
                    className="h-[2.5rem] sm:mr-auto mx-auto sm:mx-0"
                  />
                  <h3>{item.num}</h3>
                  <p className=" caption">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </section>
      <section className=" md:flex justify-between container gap-8 items-end mt-[2.5rem] md:mt-[4rem]">
        <section className=" flex-1">
          <p className=" caption mb-3 text-indigo-400">WHY STUDY ABROAD</p>
          <h3 className=" mb-6 md:w-[75%] leading-snug">
            Immigration Service From Expert Agent
          </h3>
          <p className=" mb-8  md:w-[90%]">
            The SysQube offers comprehensive services for students aspiring to
            study abroad. We provide expert guidance, from initial counselling
            to post-arrival support, ensuring a seamless transition to
            international education.
          </p>
          <div className=" grid grid-cols-2 gap-4">
            {listItems.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className=" flex items-center gap-2.5">
                    <FaCheck className=" text-indigo-400 text-[0.8rem]" />
                    <h6>{item.title}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div className=" relative mt-[2rem] md:mt-0 flex gap-4 md:gap-6 justify-center md:justify-end items-end md:w-[50%] group">
          <div className=" hidden md:block absolute bg-indigo-400 w-[1.1rem] rounded-lg h-[5.5rem] z-[5] left-[10rem] top-0">
            <p className=" hidden">hello</p>
          </div>
          <img
            src="https://th.bing.com/th/id/R.38023a515503610008d1682508e99fbd?rik=ACq8rLj6ktACaQ&riu=http%3a%2f%2fwww.studentworldonline.com%2fuserfiles%2fimages%2fStudent+life+-+why+study+abroad.jpg&ehk=ytbDMHg4lNlnckzkqSxR8V3nx%2fM0PLz1MuEHnHrGwKU%3d&risl=&pid=ImgRaw&r=0"
            alt="stdu abroad"
            className=" object-cover h-[8rem] md:h-[14rem] w-[50%] md:w-[60%] rounded-md md:left-[8.5rem] md:-bottom-10 md:absolute z-[2] drop-shadow-md"
          />
          <div className="hidden border-t-2 border-gray-100 md:flex items-center gap-3 md:w-[32%] p-5 drop-shadow-lg bg-white rounded-l-2xl rounded-tr-2xl  absolute bottom-[14rem] right-[48%] z-[3]  ">
            <img
              src="/assets/support.png"
              className=" object-cover object-top size-[2.4rem]   "
            />
            <p className=" font-semibold small-text ">Meet Our Expert Agents</p>
          </div>
          <img
            src="https://png.pngtree.com/back_origin_pic/04/03/33/d4b7eb2b7a0b9c60434b3654f3da5d33.jpg"
            className=" object-cover object-top size-[8rem] md:size-[26rem] brightness-90 w-[50%] md:w-[65%] relative rounded-md "
          />
        </div>
      </section>
      <div className=" container mt-[2.5rem] lg:mt-[4rem] lg:space-y-8">
        <h4 className=" mb-[2.5rem] md:mb-[3rem] border-l-4 border-indigo-400 px-3">Top destinations to study abroad</h4>
        <Destinations />
      </div>
      <section className=" container my-[2.5rem] lg:my-[4rem] relative">
        <h4 className=" mb-[0.5rem] border-l-4 border-indigo-400 px-3">Success Stories</h4>
       <SuccessStory/>
      </section>
    </section>
  );
};

export default StudyAbroad;

