import React, { useState, useEffect, useCallback, memo } from "react";
import Slider from "react-slick";
import { places } from "../utils/Elements"; // Assume `places` is an array of country objects
import CustomButton from "../reusables/CustomButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { countryInfo } from "../app/slices/CountrySlice";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Preload a specific image
const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

const TopDestination = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload only the current and next images for optimization
    preloadImage(places[currentIndex]?.banner);
    preloadImage(places[(currentIndex + 1) % places.length]?.banner);
  }, [currentIndex]);

  // Callback to handle slide change when an item is clicked
  const handleSlideClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const NextArrow = ({ onClick }) => (
    <div
      className="bg-white/40 rounded-full backdrop-blur-sm p-1 text-neutral-900 font-[30px] cursor-pointer z-[1] absolute -bottom-[11%] md:-bottom-[10%] left-[53%] md:left-[8%]"
      onClick={() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % places.length);
        onClick();
      }}
    >
      <IoIosArrowForward className="rounded-lg text-[1.2rem] md:text-[1.4rem]" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="bg-white/40 backdrop-blur-sm p-1 rounded-full text-neutral-900 font-[30px] cursor-pointer z-[1] absolute -bottom-[11%] md:-bottom-[10%] left-[40%] md:left-[0%]"
      onClick={() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + places.length) % places.length
        );
        onClick();
      }}
    >
      <IoIosArrowBack className="text-[1.2rem] rounded-lg md:text-[1.4rem]" />
    </div>
  );

  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Small screens (e.g., mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleCountry=(item)=>{
    dispatch(countryInfo(item));
    navigate("/countryinfo");
   }

  return (
    <section className="relative w-full py-10 lg:py-12">
      <div
        className="absolute bg-fixed inset-0 bg-center bg-cover bg-no-repeat brightness-50 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${places[currentIndex].banner})`,
          opacity: currentIndex !== null ? 1 : 0,
        }}
      />
      <section className=" relative flex justify-center text-center mb-[1.8rem] ">
        <div>
          <h2 className="text-white mb-5 "> Top Destinations </h2>
          <p className=" text-white w-[95%] lg:w-[60%] mx-auto">
            Cillum sint velit sint mollit adipisicing Lorem esse labore. Mollit
            irure ex reprehenderit occaecat cupidatat dolor ea sint sint.
            Laborum cillum qui ipsum sint est laborum.
          </p>
        </div>
      </section>

      <section className="relative container flex flex-col lg:flex-row items-center gap-10 justify-between">
        <div className="w-full lg:w-[42%]">
          <h1 className="text-white mb-5">
            {places[currentIndex].name}
          </h1>
          <p className="text-gray-100 mb-10 caption">{places[currentIndex].desc}</p>
          <CustomButton icon={<FaArrowRight className=" text-[1rem] ml-1"/>} type="button" onClick={()=>handleCountry(places[currentIndex])}>Explore</CustomButton>
        </div> 

        <div className="w-full lg:w-[56%] ml-auto">
          <Slider {...imageSliderSettings}>
            {places.map((item, idx) => (
              <div key={idx}>
                <div
                  className={`rounded-lg overflow-hidden transition-all duration-500 transform cursor-pointer ${
                    idx === currentIndex
                      ? "scale-100 brightness-100"
                      : " scale-90 brightness-50"
                  }`}
                  onClick={() => handleSlideClick(idx)}
                >
                  <h6 className="text-white mb-3">{item.name}</h6>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="rounded-md h-[15rem] md:h-[20rem] lg:h-[22.5rem] w-full object-cover object-left "
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </section>
  );
};

export default memo(TopDestination);
