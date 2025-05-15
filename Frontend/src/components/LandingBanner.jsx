import React from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetBannerQuery } from "../app/services/BannerApi";

const API_BASE = 'http://localhost:3000'; 

const LandingBanner = React.memo( () => {
    const { data: banners, isLoading, isError, error } = useGetBannerQuery();

        console.log("Banners from API (LandingBanner):", JSON.stringify(banners, null, 2)); 

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

 if (isLoading){
    return <div className="flex justify-center items-center h-[35rem] 5rem] md:h-[90vh] lg:h-[100vh]">Loading...</div>
  }

  if (isError) {
    console.error("Error fetching banners:", error);
    return <div className="flex justify-center items-center h-[35rem] md:h-[90vh] lg:h-[100vh]">Error loading banners. Please try again later.</div>;
  }

  if (!banners || banners.length === 0) {
    return <div className="flex justify-center items-center h-[35rem] md:h-[90vh] lg:h-[100vh]">No banners to display.</div>;
  }

  return (
    <Slider {...settings} className="w-full ">
      {banners.map((item) => {
        console.log("Processing banner item in map (LandingBanner):", JSON.stringify(item, null, 2)); 

        const imageUrl = item.image?.url ? `${API_BASE}${item.image.url}` : '/assets/placeholder_banner.jpg'; 
        console.log(`LandingBanner - Item ID: ${item._id}, Heading: ${item.heading}, Paragraph: ${item.paragraph}, Image URL: ${imageUrl}`);

        const buttonLink = item.button?.link 
          ? (item.button.link.startsWith('http') ? item.button.link : `http://${item.button.link}`)
          : '#';
        return (
          <section
            className=" relative group h-[35rem] md:h-[90vh]  lg:h-[100vh] xl:h-[99vh] 2xl:h-[40rem] content-center "
            key={item._id}
          >
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat brightness-50"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
                            title={item.image?.alt || item.heading}

            />
            <section className=" relative container text-center flex flex-col ">
              <h1 className=" hidden sm:block text-white mx-auto leading-tight lg:w-[67%] mb-8 ">{item.heading}</h1>
              <h3 className="block sm:hidden text-white mx-auto lg:w-[67%] mb-6 ">{item.heading}</h3>
              <p className=" lg:w-[75%] w-[96%] text-gray-100 mx-auto leading-loose mb-[2.5rem] md:mb-[4rem] ">{item.paragraph}</p>
              {item.button?.text && (
                <a
                  href={buttonLink}
                  target={item.button.link && !item.button.link.startsWith('/') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 md:px-8 rounded-md text-lg md:text-xl transition duration-300 ease-in-out transform group-hover:scale-105 mx-auto md:w-auto"
                >
                  {item.button.text}
                </a>
              )}
            </section>
          </section>
        );
      })}
    </Slider>
  );
});

export default LandingBanner;
