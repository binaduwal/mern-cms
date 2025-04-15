import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoBar from "../reusables/InfoBar";
import { places } from "../utils/Elements";
import { countryInfo } from "../app/slices/CountrySlice";
import { Outlet } from "react-router-dom";
import JumptoSection from "../reusables/JumptoSection";
import "./CountryDetails.css"

const CountryDetails = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.countryslice);

  const [selectedId, setSelectedId] = useState(null);

  const handleCountry = (item) => {
    dispatch(countryInfo(item));
    setSelectedId(item.id); // Update the selected ID
  };

  const detailsNav = [
    { title: " Key Facts", path: "facts" },
    { title: " Universities", path: "university" },
    { title: " Best Programs", path: "programs" },
    { title: " Requirements", path: "requirements" },
    { title: " Inquiry", path: "inquiry" },
  ];

  return (
    <>
      <InfoBar
        title="About Country"
        parentpath="Study Abroad"
        childpath="Country Info"
      />
      <section className="md:flex container justify-between gap-12 lg:gap-16 mt-[2.5rem] md:mt-[4rem]">
        <section className="md:w-[30%] bg-gray-100 p-8 rounded-2xl">
          <h6 className="mb-6">Alternative Countries</h6>
          <div className="flex flex-col gap-5">
            {places.map((item, idx) => (
              <div
                key={idx}
                className={`w-full flex duration-500 items-center justify-between rounded-xl px-4 py-3 ${
                  selectedId === item.id ? "bg-indigo-400" : "bg-white"
                }`}
                onClick={() => handleCountry(item)}
              >
                <p className={`${selectedId === item.id ? "text-white" : ""}`}>
                  {item.name}
                </p>
                <img
                  src={item.flag}
                  alt={`${item.name} flag`}
                  className="rounded-full object-cover h-10"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="md:flex-1 mt-[2.5rem] md:mt-0">
          <h3 className="mb-6">Study in {country.name}</h3>
          <p className="flex flex-col gap-7 mb-10">
            {country.name} is a top destination for students worldwide, offering
            excellent education and an exciting lifestyle.When it comes to
            world-class education, it also stands as a beacon of excellence,
            offering a welcoming environment, top-tier institutions, and a
            diverse cultural tapestry. 
            <span>Studying in {country.name} isn't just about
            gaining a degree. It's about immersing yourself in an enriching
            educational experience that prepares you for global success. Here's
            a glimpse into what makes studying in {country.name}.</span>
          </p>
          <img
            src={country.img}
            className="w-full h-[14rem] sm:h-[16rem] object-cover rounded-2xl"
            alt={`${country.name}`}
          />
        </section>
      </section>

      <section className="w-full relative flex justify-between container gap-14 mt-[0.5rem] mb-[3rem] md:mb-[4rem]">
        <Outlet />
        <section className=" hidden sm:block sm:w-[28%] sticky top-0 right-0 h-fit sm:pt-[4.75rem] ">
         <JumptoSection data={detailsNav}/>
        </section>
      </section>
    </>
  );
};

export default CountryDetails;
