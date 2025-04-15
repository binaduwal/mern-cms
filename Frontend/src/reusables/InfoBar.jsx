import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const InfoBar = ({ title, parentpath, childpath}) => {
  function capitalizeAllLetters(str) {
    if (!str) return str; // Return the original string if it's empty
    return str.toUpperCase();
  }
  return (
    <section className=" h-[15rem] md:h-[20rem] flex  relative font-montserrat">
      <div
        className="absolute bg-fixed inset-0 bg-top rounded-sm bg-cover bg-no-repeat brightness-50 "
        style={{
          backgroundImage: `url("/banners/about.jpg")`,
        }}
      />
      <section className=" container relative flex flex-col mt-[2rem] md:mt-[3rem] gap-3.5 text-center ">
        <h1 className=" text-white tracking-wider">{capitalizeAllLetters(title)}</h1>
        <div className=" flex w-fit mx-auto items-center text-white gap-2 ">
          <p className=" text-white  font-semibold ">{capitalizeAllLetters(parentpath)}</p>
          <MdOutlineArrowForwardIos />
          <p className=" text-white font-semibold">{capitalizeAllLetters(childpath)}</p>
        </div>
      </section>
    </section>
  );
};

export default InfoBar;
