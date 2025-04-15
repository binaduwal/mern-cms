import React, { useState } from "react";
import { MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { settings } from "../reusables/SliderSettings";
import { IoLanguage } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import Faq2 from "../reusables/Faq2";
import InquiryForm from "./InquiryForm";
import { BiSolidDownArrow } from "react-icons/bi";
import { HiCurrencyDollar } from "react-icons/hi";

const SpecificCountry = () => {
  const { country } = useSelector((state) => state.countryslice);
  console.log("country detials:", country);
  const [expandedIdx, setExpandedIdx] = useState(null); // State to track which item is expanded

  const handleItemClick = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx); // Toggle expanded state
  };

  return (
    <section className=" w-[100%] sm:w-[68%] mt-[2rem] md:mt-0">
      <section id="facts">
        <h4 className=" border-l-4 border-indigo-400 pl-4 mb-8">
          Key Facts
        </h4>
        {country.keyFacts.map((item, idx) => {
          return (
            <div className=" grid grid-col-1 sm:grid-cols-2 gap-6 md:gap-10" key={idx}>
              <Facts
                icon={<HiCurrencyDollar className=" text-green-500" />}
                title="Currency"
                context={item.currency}
              />
              <Facts
                icon={<MdGroups className=" text-indigo-500" />}
                title="Student Population"
                context={item.student_population}
              />
              <Facts
                icon={<IoLanguage className=" text-blue-400" />}
                title="Language"
                context={item.language}
              />
              <Facts
                icon={<FaUniversity className=" text-yellow-400" />}
                title="Universities"
                context={item.universities}
              />
            </div>
          );
        })}
      </section>

      <section className=" mt-[2.5rem] md:mt-[4rem]" id="university">
        <h4 className=" border-l-4 border-indigo-400 pl-4 mb-8 md:mb-10">
          Universities in {country.name}
        </h4>
      </section>
      <Slider {...settings} className="testimonial-slider">
        {country.university.map((item, idx) => (
          <div
            key={idx}
            className="relative mb-5 content-end p-4 group h-[12rem] md:h-[14rem] lg:h-[16rem] rounded-[1rem] cursor-pointer"
            onClick={() => handleItemClick(idx)} // Click handler to expand
          >
            {/* Background image div */}
            <div
              className={`absolute rounded-[1rem] inset-0 bg-center bg-cover bg-no-repeat ${
                expandedIdx === idx
                  ? "contrast-50 brightness-50"
                  : "brightness-75"
              } transition-all duration-500`}
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            />

            {/* Foreground content */}
            <div className="relative flex flex-col justify-end gap-1  h-full">
              {/* Item Name - Visible Initially */}
              <h6 className="text-white font-jamjure tracking-wider flex items-center gap-x-3 ">
                {item.name}
                <span>
                  <BiSolidDownArrow
                    className={` text-white text-[1rem] duration-500 ${
                      expandedIdx === idx ? " rotate-180 " : " rotate-0"
                    } `}
                  />
                </span>
              </h6>

              {/* Details section with translate-y animation */}
              <div
                className={`p-1 duration-700  transition-[max-height] ease-in-out ${
                  expandedIdx === idx
                    ? "opacity-100 max-h-full "
                    : " max-h-0 opacity-0"
                }`}
              >
                <p className="caption text-white mb-2">
                  Average Fees: {item.fees}
                </p>
                <p className="small-text text-white">Courses: {item.courses}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <section className=" mt-[2.5rem] md:mt-[5rem]" id="programs">
        <h4 className=" border-l-4 border-indigo-400 pl-4 mb-8 md:mb-10">
          What are the best programs in the {country.name} ?
        </h4>
        <p> {country.programs}</p>
      </section>

      <h4
        className=" border-l-4 border-indigo-400 pl-4 mb-8 md:mb-10 mt-[2.5rem] md:mt-[4rem]"
        id="scholarship"
      >
        Scholarships in {country.name}
      </h4>
      <Slider {...settings} className=" testimonial-slider ">
        {country.scholarships.map((item, idx) => (
          <div
            key={idx}
            className="relative mb-5 content-end p-4 group h-[12rem] md:h-[14rem] lg:h-[16rem] rounded-[1rem] cursor-pointer"
            onClick={() => handleItemClick(idx)} // Click handler to expand
          >
            {/* Background image div */}
            <div
              className={`absolute rounded-[1rem] inset-0 bg-center bg-cover bg-no-repeat ${
                expandedIdx === idx
                  ? "contrast-50 brightness-50"
                  : "brightness-50"
              } transition-all duration-500`}
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            />

            {/* Foreground content */}
            <div className={`relative flex flex-col justify-end gap-2 h-full `}>
              {/* Item Name - Visible Initially */}
              <h6 className="text-white font-jamjure tracking-wider flex items-center gap-x-3">
                {item.name}
                <span>
                  <BiSolidDownArrow
                    className={` text-white text-[1rem] duration-500 ${
                      expandedIdx === idx ? " rotate-180 " : " rotate-0"
                    } `}
                  />
                </span>
              </h6>

              {/* Details section with translate-y animation */}
              <div
                className={`p-1 duration-700  transition-[max-height] ease-in-out ${
                  expandedIdx === idx
                    ? "opacity-100 max-h-full "
                    : " max-h-0 opacity-0"
                }`}
              >
                <p className="small-text text-white ">{item.details}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <section className=" mt-[2.5rem] md:mt-[4.5rem]" id="requirements">
        <h4 className=" border-l-4 border-indigo-400 pl-4 mb-8 md:mb-10">
          Requirements
        </h4>
        <Faq2 data={country.requirement} />
      </section>

      <section className="mt-[2.5rem] md:mt-[4.5rem]" id="inquiry">
        <h4 className=" border-l-4 border-indigo-400 pl-4 mb-7 md:mb-10">Inquiry</h4>
        <InquiryForm />
      </section>
    </section>
  );
};

export default SpecificCountry;

const Facts = ({ title, context, icon }) => {
  return (
    <section className=" flex gap-6 items-center bg-gray-50 px-6 py-2.5 rounded-lg">
      <div className=" bg-white py-3 px-3.5 rounded-xl">
        <h2 className=" text-[2.5rem]">{icon}</h2>
      </div>
      <div>
        <p className=" mb-1">{title}</p>
        <h5>{context}</h5>
      </div>
    </section>
  );
};
