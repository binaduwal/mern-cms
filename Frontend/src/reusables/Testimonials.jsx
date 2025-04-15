import React from "react";
import Slider from "react-slick";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import "./Testimonials.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-900 font-[30px] cursor-pointer z-[1] absolute top-[40%] -right-4 lg:-right-12"
        onClick={onClick}
      >
        <IoIosArrowForward className=" rounded-lg text-[1.8rem] md:text-[2rem] lg:text-[2.5rem]" />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-900 font-[30px] cursor-pointer z-[1] absolute top-[40%] -left-4 lg:-left-12"
        onClick={onClick}
      >
        <IoIosArrowBack className=" text-[1.8rem] rounded-lg md:text-[2rem] lg:text-[2.5rem]" />
      </div>
    );
  };
  const review = [
    {
      id: 1,
      desc: "I was looking for a top education consultant in Kathmandu and luckily a friend recommended me to the best education consultancy in Nepal. The consultancy in Nepal for Canada assisted me from getting a letter of offer for my education, acquiring a student insurance coverage and finally arranging my visa.",
      name: "Sarina Shrestha",
      location: "Canada",
    },
    {
      id: 2,
      desc: "Consultancy Nepal is the best overseas education consultant in Nepal. They provided great assistance with my student visa application in Melbourne, Australia. Additionally, the team has been very approachable and always there to answer all my queries.",
      name: "Shirish Shrestha",
      location: " USA",
    },
    {
      id: 3,
      desc: "I am ever grateful to the competent team for helping me attain my Canada student visa in no time. The consultation and customer services they provide are efficient and excellent. Conusultant Nepal is the best education consultancy in Kathmandu.",
      name: "Devnand Thapa",
      location: " Australia",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Medium screens (e.g., tablets)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Small screens (e.g., mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" container my-[2rem] md:my-[4rem] ">
      <h3>Testimonials</h3>
      <Slider
        {...settings}
        className=" mt-[1rem] lg:mt-[2rem] testimonial-slider mx-2 md:mx-0"
      >
        {review.map((revs,idx) => {
          return (
            <section className=" mb-6" key={idx}>
            <div
              className=" h-[18rem] md:h-[19rem] px-6 py-8 relative duration-300 rounded-t-2xl rounded-bl-2xl bg-gray-100 space-y-5 "
              key={revs.id}
            >
              <BiSolidQuoteLeft className="text-4xl text-indigo-400" />
              <p className=" caption">{revs.desc}</p>

              {/* Profile Section */}
            </div>
            <section className=" flex relative">
              <div className=" absolute  -right-30 flex items-center gap-3 bg-white  rounded-t-[18px] rounded-bl-3xl p-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center text-lg font-semibold">
                  {revs.name.charAt(0).toUpperCase()}
                </div>
                <section>
                  <p className="font-semibold caption mb-1.5">{revs.name}</p>
                  <p className="caption flex items-center gap-1 text-gray-500">
                    <HiLocationMarker className="text-[16px] text-indigo-400" />
                    {revs.location}
                  </p>
                </section>
              </div>
              <div className=" bg-gray-100 flex-1 rounded-b-3xl rounded-tl-3xl p-3">
                <h4 className=" opacity-0">hello</h4>
              </div>
              </section>
            </section>
          );
        })}
      </Slider>
    </div>
  );
};

export default Testimonials;
