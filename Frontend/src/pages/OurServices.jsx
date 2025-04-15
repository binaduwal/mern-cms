import React from "react";
import InfoBar from "../reusables/InfoBar";
import { cardDetails } from "../utils/Elements";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  const navigate=useNavigate();
  const stats = [
    {
      title: "Best Talent Networking ",
      desc: "Exercitation deserunt incididunt est ut commodo Lorem proident est. Incididunt reprehenderit anim eiusmod proident pariatur.",
    },
    {
      title: "Goal Target Degree",
      desc: "Exercitation deserunt incididunt est ut commodo Lorem proident est. Incididunt reprehenderit anim eiusmod proident pariatur.",
    },
    {
      title: "3 year of experience",
      desc: "Exercitation deserunt incididunt est ut commodo Lorem proident est. Incididunt reprehenderit anim eiusmod proident pariatur.",
    },
    {
      title: "Have A Good Track Record",
      desc: "Exercitation deserunt incididunt est ut commodo Lorem proident est. Incididunt reprehenderit anim eiusmod proident pariatur.",
    },
  ];

  const [expandedItem, setExpandedItem] = React.useState(null);
  const handleExpand = (item) => {
    setExpandedItem(expandedItem === item.id ? null : item.id); 
  };
  return (
    <>
      <InfoBar title="Services" parentpath="Home" childpath="Services" />
      <section className=" container mt-[1.5rem] md:mt-[3rem]">
        <h2 className=" text-center mb-[1.5rem] md:mb-[2.5rem]">Our Services</h2>
        <section className=" md:flex justify-between gap-6">
          {/*video section*/}
          <div className=" relative rounded-2xl flex-1">
            {/* <iframe
              src="https://www.youtube.com/embed/MaChSn752kE"
              className="h-full rounded-xl"
              allowFullScreen
            ></iframe> */}
            <img
              src="https://thumbs.dreamstime.com/b/our-services-text-blackboard-business-concept-background-our-services-text-blackboard-197868790.jpg"
              className=" h-full w-full rounded-2xl object-cover brightness-90"
            />
            <span className=" bg-white p-4 rounded-full absolute top-[45%] left-[42%] z-[3] drop-shadow-md">
              <FaPlay className=" text-indigo-400 text-[1.5rem]" />
            </span>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[2rem] md:mt-0 gap-6 md:w-[72%]">
            {cardDetails.map((item, idx) => {
        const isExpanded = expandedItem === item.id;     

        return (
          <section
            className={`relative group cursor-pointer transition-all duration-500 transform ${
              isExpanded
                ? "col-span-full flex flex-col md:flex-row"
                : expandedItem
                ? "hidden"
                : " hover:-translate-y-2"
            }`}
            key={item.id}     
          >

            {isExpanded ? (
              <div className=" flex flex-col drop-shadow-md rounded-r-xl justify-center px-8 md:px-20 pb-8 md:pb-20 pt-5 bg-white bg-opacity-75 backdrop-blur-md relative flex-1">
                <div className=" absolute right-2 top-3 bg-neutral-700 backdrop-blur-md p-2 rounded-full">
                  <RxCross2
                    onClick={() => handleExpand(item)}
                    className="text-white text-[1.5rem]"
                  />
                </div>
                <h1 className="text-neutral-200 text-right">0{idx + 1}</h1>

                <h3 className="text-2xl text-indigo-400 mb-5">
                {item.title}
                </h3>
                <p className="mb-8">{item.desc}</p>
              </div>
            ) : (
              <div
                  key={idx}
                  className=" bg-white group hover:bg-indigo-400 drop-shadow-md border-t-2 border-gray-100 px-6 py-5 rounded duration-500 hover:rounded-2xl "
                >
                  <h2 className={`mb-4 ${item.color} group-hover:text-white `}>{item.icon}</h2>
                  <p className=" mb-4 font-semibold group-hover:text-white">{item.title}</p>
                  <p className=" mb-2 h-[5rem] caption group-hover:text-white">{item.summary}</p>
                  <p className=" hover:translate-x-1.5 duration-300 caption group-hover:text-white text-indigo-400 flex items-center gap-3" onClick={() => handleExpand(item)}>Learn More
                  <span><FaArrowRight className=" text-[1rem] "/></span></p>
                </div>
            )}
          </section>
        );
      })}
          </div>
        </section>
      </section>
      <section className=" mt-[2.5rem] md:mt-[4rem] container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 sm:gap-10 md:gap-14">
        <section className=" col-span-2 content-end">
          <p className=" caption mb-4 text-indigo-500">GREAT SERVICES</p>
          <h4 className=" md:w-[58%] mb-8">
            We Are Professionals Since 5 Years Experience
          </h4>
          <img
            src="https://static.javatpoint.com/definition/images/experience-definition.png"
            className=" rounded-xl w-full object-cover h-[12rem] sm:h-[17rem]"
            alt="Services"
          />
        </section>
        <section className="hidden sm:block col-span-1 content-start ">
          <div className=" relative ">
            <img
              src="https://th.bing.com/th/id/OIP.MMsYZP7G5DqKd6Pa0IyU2QHaFD?rs=1&pid=ImgDetMain"
              className=" h-[20rem] md:h-[23rem]  rounded-2xl brightness-90 object-cover object-right"
            />
            <span className=" bg-white p-4 rounded-full absolute top-[45%] left-[40%] z-[3] drop-shadow-md">
              <FaPlay className=" text-indigo-400 text-[1.5rem]" />
            </span>
          </div>
        </section>
        <section className=" col-span-1 mt-[2rem] sm:mt-0 space-y-2.5 md:space-y-3 content-center">
          <img
            src="https://refpaymedia.com/wp-content/uploads/2023/09/Provide-Quality-Services.jpg"
            className=" object-cover h-[10rem] sm:h-[8rem] w-full rounded-xl"
          />
          <p className=" font-semibold md:w-[75%]">
            Good Talent Choicing Waranty Services
          </p>
          <p className=" caption">
            Magna eiusmod officia aliquip sint deserunt cillum cupidatat
            incididunt fugiat amet veniam elit. Excepteur commodo incididunt do
            in.
          </p>
        </section>
      </section>
      <section className="  bg-gray-100 py-8 px-0 md:py-20 md:px-20 mt-[2.5rem] md:mt-[4rem]">
       <section className=" md:flex container  justify-between gap-14">
        <section className=" md:w-[30%]">
          <img
            src="https://hexaware.com/wp-content/uploads/2019/10/Service-Management.jpg"
            alt="Img"
            className=" h-full w-full object-cover object-right rounded-xl"
          />
        </section>
        <section className=" flex-1">
          <p className=" mb-4 caption text-indigo-400 mt-[2rem] md:mt-0" >WHY CHOOSE US</p>
          <h4 className=" sm:w-[70%] mb-6 md:leading-snug">
            We Offer A Unique Requirement Service Focused On Executive Search
            Talent
          </h4>
          <button className=" flex items-center gap-2 mb-12" onClick={()=>navigate("/contactus")}>
           
            Contact Us
            <FaArrowRight className=" text-white text-[1rem]"/>
          </button>
          <div className=" grid grid-cols-1 sm:grid-cols-2  gap-6 sm:gap-7">
            {stats.map((item, idx) => {
              return (
                <div key={idx} className=" bg-white hover:-translate-y-2 duration-500 px-7 py-5 drop-shadow-md rounded-lg">
                  <p className=" mb-3 font-semibold">{item.title}</p>
                  <p className=" caption">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
        </section>
      </section>
    </>
  );
};

export default OurServices;
