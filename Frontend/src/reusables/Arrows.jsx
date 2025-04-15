import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
export const NextArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-800 font-[30px] cursor-pointer z-[1] absolute top-[40%] -right-3 md:-right-[2.1rem]"
        onClick={onClick}
      >
        <IoIosArrowForward className=" rounded-lg text-[1.7rem] md:text-[2rem] lg:text-[2.6rem]" />
      </div>
    );
  };

 export const PrevArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-800 font-[30px] rounded-lg cursor-pointer z-[1] absolute top-[40%] -left-3 md:-left-[2.2rem]"
        onClick={onClick}
      >
        <IoIosArrowBack className=" text-[1.7rem] rounded-lg md:text-[2rem] lg:text-[2.5rem]" />
      </div>
    );
  };