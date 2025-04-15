import React, { useState } from 'react'
import { Link } from "react-scroll";


const JumptoSection = ({data}) => {
    const [activeLink, setActiveLink] = useState("");

  return (
    <section className="bg-white rounded-sm xl:h-[75vh] 2xl:h-[30rem] drop-shadow border border-gray-100 p-5 md:p-8">
    <p className=" subheading mb-5 border-b-[3px] border-indigo-400 w-fit pb-2">Jump to Section :</p>
    <div className="flex flex-col gap-3 px-1 md:px-2.5">
      {data.map((item, idx) => (
        <Link
          key={idx}
          to={item.path}
          smooth={true}
          duration={700}
          offset={-100}
        >
          <h6
            className={`cursor-pointer duration-500 py-2.5 ${
              activeLink === item.path
                ? " bg-indigo-50 border-l-4 px-3 border-indigo-400"
                : ""
            }`}
            onClick={() => setActiveLink(item.path)} // Set active link on click
          >
            {item.title}
          </h6>
        </Link>
      ))}
    </div>
    </section>
  )
}

export default JumptoSection
