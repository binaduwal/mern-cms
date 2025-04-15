import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const LandingBanner = React.memo( () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        className=" bg-white/40 opacity-90 backdrop-blur-md p-1 rounded-lg font-[30px] cursor-pointer z-[1] absolute top-[70%] sm:top-[40%] right-1 md:right-[1.5rem]"
        onClick={onClick}
      >
        <IoIosArrowForward className=" rounded-lg text-[1.6rem] md:text-[2rem] lg:text-[2.5rem]" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="  bg-white/40 opacity-90 backdrop-blur-md p-1 font-[30px] rounded-lg cursor-pointer z-[1] absolute top-[70%] sm:top-[40%] left-1 md:left-[1.5rem]"
        onClick={onClick}
      >
        <IoIosArrowBack className=" text-[1.6rem] rounded-lg md:text-[2rem] lg:text-[2.5rem]" />
      </div>
    );
  };
  const bannerItems = [
    {
      heading:
        "STUDY IN YOUR DREAM COUNTRY WITH ONE CLICK",
      desc: "Nostrud ullamco nulla id Lorem nisi labore proident reprehenderit dolore ullamco aute commodo Lorem velit magna. Sint mollit occaecat voluptate aliquip velit.",
      button: "CONTACT NOW",
      banner: "/assets/banner_1.jpg",
      bg: "bg-indigo-400",
    },
    {
      heading: "SCHOLARSHIPS FOR STUDENTS TRYING TO STUDY ABROAD",
      desc: "Nulla labore aliquip laboris exercitation ea labore mollit excepteur irure cupidatat non id. Sunt incididunt do aliquip ex in consequat excepteur irure ea duis aliquip qui do.",
      button: "FIND SCHOLARSHIP",
      bg: "bg-violet-400",
      banner: "/assets/banner_2.png",
    },
    {
      heading: "UNLOCK YOUR STUDY ABROAD DREAM WITH SYSQUBE",
      desc: "Your abroad study journey begins here. Laboris exercitation ea labore mollit excepteur irure cupidatat non id irure ea duis aliquip qui do.",
      button: "STUDY ABROAD ",
      bg: "bg-emerald-400",
      banner: "/assets/banner_3.jpg",
    },
  ];

  const settings = {
    dots: false,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplaySpeed: 3000,
    pauseOnHover: false,  
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: "ondemand", // Lazy load images as needed
  };

  return (
    <Slider {...settings} className="w-full ">
      {bannerItems.map((item, idx) => {
        return (
          <section
            className=" relative group h-[35rem] md:h-[90vh]  lg:h-[100vh] xl:h-[99vh] 2xl:h-[40rem] content-center "
            key={idx}
          >
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat brightness-50"
              style={{
                backgroundImage: `url(${item.banner})`,
              }}
            />
            <section className=" relative container text-center flex flex-col ">
              <h1 className=" hidden sm:block text-white mx-auto leading-tight lg:w-[67%] mb-8 ">{item.heading}</h1>
              <h3 className="block sm:hidden text-white mx-auto lg:w-[67%] mb-6 ">{item.heading}</h3>
              <p className=" lg:w-[75%] w-[96%] text-gray-100 mx-auto leading-loose mb-[2.5rem] md:mb-[4rem] ">{item.desc}</p>
              <button className=" md:w-[15%] ml-auto mr-auto py-4 px-3 font-jamjure">
                {item.button}
              </button>
            </section>
          </section>
        );
      })}
    </Slider>
  );
});

export default LandingBanner;
