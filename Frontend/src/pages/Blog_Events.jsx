import React from "react";
import { Outlet } from "react-router-dom";
import InfoBar from "../reusables/InfoBar";

const Blog_Events = () => {
  return (
    <div>
      <InfoBar
        title="Blogs & Events"
        parentpath="Home"
        childpath="Blogs & Events"
      />
      <div className=" container lg:flex justify-between mt-[1.5rem] lg:mt-[4rem] ">
        <section className=" lg:w-[55%]">
          <h3 className=" mb-4">What Students Read</h3>
          <p className=" mb-2.5 text-justify lg:text-left">
            Answers to your Any and Every Study Abroad Queries, All in One
            Space!Cillum quis est ex consectetur culpa nulla nostrud velit
            labore irure irure et. Dolor magna nostrud mollit minim commodo
            culpa ullamco veniam est. Deserunt proident deserunt duis nulla
            excepteur nisi.
          </p>
          <p className="text-justify lg:text-left">
            Read on to get your latest updates on Universities, Courses Offered,
            Student Visa Updates, and lots more! Ea reprehenderit officia nisi
            officia sunt exercitation minim aliqua sunt proident ipsum. Dolore
            magna consectetur et enim. Ex esse laborum sit eu qui adipisicing
            qui ipsum enim ea tempor nulla culpa.
          </p>
        </section>
        <img
          src="https://cdn.dribbble.com/users/2187949/screenshots/11726816/image.png"
          alt="news"
          className=" hidden lg:block h-[14rem] md:h-[16rem] lg:h-[20rem] rounded-lg opacity-50 md:opacity-100"
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Blog_Events;
