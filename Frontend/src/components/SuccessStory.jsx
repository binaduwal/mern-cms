import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import "./SuccessStory.css"

const SuccessStory = () => { 
    const NextArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-800 drop-shadow-md bg-white rounded-full p-2 font-[30px] cursor-pointer z-[1] absolute top-[44%] sm:top-[50%] md:top-[43%] md:left-[31.5%] left-[50%]"
        onClick={onClick}
      >
        <IoIosArrowForward className=" rounded-lg text-[1.4rem] lg:text-[1.8rem]" />
      </div>
    );
  };

 const PrevArrow = ({ onClick }) => {
    return (
      <div
        className=" text-neutral-800 drop-shadow-md bg-white rounded-full p-2 font-[30px] cursor-pointer z-[1] absolute top-[44%] sm:top-[50%] md:top-[43%] left-[30%] md:left-[4.4rem]"
        onClick={onClick}
      >
        <IoIosArrowBack className=" text-[1.4rem] rounded-lg lg:text-[1.8rem]" />
      </div>
    );
  };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
    
      const storiesList = [
        {
          stars: "⭐⭐⭐⭐",
          name: "Ar Shakir",
          profile: "https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg",
          story:
            "Exercitation sunt nulla sit culpa cillum laboris exercitation occaecat ipsum exercitation labore officia reprehenderit qui. Sit duis Lorem voluptate elit consectetur ut consequat laborum do amet do duis eiusmod. Qui labore commodo nulla voluptate ex non consectetur nulla cillum esse aliquip.",
          destination: "Canada",
        },
        {
          stars: "⭐⭐⭐⭐",
          name: "Arjun Maharjan",
          profile: "https://i1.sndcdn.com/avatars-000330087696-yzjwn2-t500x500.jpg",
          story:
            "Exercitation sunt nulla sit culpa cillum laboris exercitation occaecat ipsum exercitation labore officia reprehenderit qui. Sit duis Lorem voluptate elit consectetur ut consequat laborum do amet do duis eiusmod. Qui labore commodo nulla voluptate ex non consectetur nulla cillum esse aliquip.",
          destination: "Canada",
        },
        {
          stars: "⭐⭐⭐⭐⭐",
          name: "Shirish Shrestha",
          profile:
            "https://cdn.theorg.com/a2743a89-a4d9-4b23-9058-68a5848510d7_medium.jpg",
          story:
            "Exercitation sunt nulla sit culpa cillum laboris exercitation occaecat ipsum exercitation labore officia reprehenderit qui. Sit duis Lorem voluptate elit consectetur ut consequat laborum do amet do duis eiusmod. Qui labore commodo nulla voluptate ex non consectetur nulla cillum esse aliquip.",
          destination: "Canada",
        },
      ];
  return (
    <Slider {...settings} className=" testimonial-slider ">
          {storiesList.map((person, idx) => {
            return (
              <main key={idx}>
                <section className=" md:flex justify-between gap-10">
                <section className=' relative h-[30rem] content-center md:w-[40%]'>
                <img src="/assets/pie_1.png" className="h-[2rem] sm:h-[2.7rem] absolute z-[1] left-4 md:left-[3.8rem] md:opacity-75 top-[3.1rem]"/>
                <img src="/assets/pie2.png" className="h-[2rem] sm:h-[2.6rem] absolute z-[0] -left-1 md:left-[1.4rem] md:opacity-75 top-[20px] md:top-[26px] "/>
                <img src="/assets/pie2.png" className="h-[4rem] sm:h-[6.4rem] absolute z-[0] right-0 md:right-8 bottom-[16px] opacity-75 rotate-180"/>
                <img src="/assets/grid.png" className="h-[4.5rem] sm:h-[7rem] absolute z-[0] opacity-30 right-0 md:right-11 top-16 sm:top-10"/>
                <img src={person.profile} className=" h-[18rem]  sm:h-[21rem] object-cover relative object-top w-[90%] md:w-[65%] mx-auto z-[1]"/>
                </section>
                  <section className=" md:w-[55%] content-center">
                  <div className=" mb-6 md:mb-8">
                    <FaQuoteLeft className=" text-indigo-400 text-[1.5rem] mb-4"/>
                    <h6 className=" mb-5">{person.stars}</h6>
                    <p className=' text-[19px]'>{person.story}</p>
                    </div>
                  <div>
                    <h6 className=' mb-1'>{person.name}</h6>
                    <p>{person.destination}</p>
                  </div>
                  </section>

                </section>
              </main>
            );
          })}
        </Slider>
  )
}

export default SuccessStory
