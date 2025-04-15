import React, { useEffect, useRef, useState } from "react";
import { BsPassport } from "react-icons/bs";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { SlLayers } from "react-icons/sl";

const SummarySection = () => {
  const circleItems = [
    {
      title: "Audience",
      desc: "Laboris dolore est occaecat aute incididunt tempor do. Cupidatat in labore adipisicing officia aliqua.",
      icon: <PiUsersThree />,
    },
    {
      title: "Passport",
      desc: "Laboris dolore est occaecat aute incididunt tempor do. Cupidatat in labore adipisicing officia aliqua .",
      icon: <BsPassport />,
    },
    {
      title: "Graduate",
      desc: "Laboris dolore est occaecat aute incididunt tempor do. Cupidatat in labore adipisicing officia aliqua.",
      icon: <FaGraduationCap />,
    },
  ];
  const summaryDesc = [
    {
      id: 1,
      title: "Countries",
      numbers: "5",
      image:
        "https://th.bing.com/th/id/OIP.Em7Sr65ineympZvXHb6VpAHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      title: "Visa Granted",
      numbers: "1050",
      image:
        "https://pavaedu.com/wp-content/uploads/2022/03/vize-nedir-min-2.jpg",
    },
    {
      id: 3,
      title: "Students",
      numbers: "3000",
      image:
        "https://th.bing.com/th/id/OIP.CAuvX4cYQcwSxu2wU3FR4QHaD4?rs=1&pid=ImgDetMain",
    },
  ];

  const sectionsRef = useRef([]); // Create refs for each section to observe
  const [visibleItems, setVisibleItems] = useState([]); // Track which items are visible

  // Function to increment the count to a target value
  const animateNumber = (start, end, duration, callback) => {
    const range = end - start;
    let current = start;
    const increment = range / (duration / 10); // Adjust the increment based on duration

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        current = end;
      }
      callback(Math.floor(current)); // Update the number displayed
    }, 10); // Update every 10ms
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleItems((prev) => [...prev, Number(index)]); // Add the visible item to the list
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the component is visible
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section); // Observe each section
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section); // Clean up observer on unmount
        }
      });
    };
  }, []);
  return (
    <section className=" flex lg:flex-row flex-col gap-4 ">
      <div className="flex flex-col lg:w-[25%] bg-indigo-400 px-5 lg:px-0">
        {summaryDesc.map((item, index) => {
          const [count, setCount] = useState(0); // State to store the animated number

          useEffect(() => {
            // Start the animation when the item becomes visible
            if (visibleItems.includes(index)) {
              animateNumber(0, item.numbers, 2000, setCount); // Adjust the duration as needed
            }
          }, [visibleItems, index, item.numbers]);

          return (
            <div
              key={index}
            ref={(el) => (sectionsRef.current[index] = el)} // Attach ref for each section
            data-index={index}
              className={`${
                index < summaryDesc.length - 1 ? "border-b-2" : ""
              } border-gray-100 py-7 md:py-9 `}
            >
              <h3 className="text-white mb-4 text-center lg:text-left ">{count} +</h3>
              <p className=" text-white mb-4 text-center lg:text-left ">{item.title} in Lorem cillum consectetur laborum pariatur aliqua.
              </p>
            </div>
          );
        })}
      </div>

      {/*image section*/}
      <section className=" flex justify-end items-center flex-1 ">
        <section className="flex items-center relative ">
          <div className=" flex flex-col gap-9 lg:gap-12 py-8 lg:py-0 relative z-10 md:-right-[5.8rem]">
            {circleItems.map((item, index) => {
              return (
                <div
                  className={` md:hover:translate-x-4 duration-500 ${
                    index === 1 ? "md:mr-14" : ""
                  } text-right flex gap-8 items-center `}
                  key={index}
                >
                  <div>
                    <h6 className=" mb-3 ">{item.title}</h6>
                    <p className=" caption ">{item.desc} </p>
                  </div>
                  <div className=" bg-white drop-shadow-lg p-4 rounded-full">
                    <h1 className=" text-[2.5rem]"> {item.icon}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <img src="/assets/teaching.png" className=" hidden md:block md:h-[16rem] lg:h-[22rem] relative " />
          <img src="/assets/airplane.png" className=" hidden md:block absolute h-[6rem] right-[8.4rem]"/>
        </section>
      </section>
    </section>
  );
};

export default SummarySection;
