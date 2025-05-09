import React from "react";
import ServiceCard from "../components/ServiceCard";
import Faq from "../components/Faq";
import LandingBanner from "../components/LandingBanner";
import CtaBooking from "../components/CtaBooking";
import WelcomeBanner from "../components/WelcomeBanner";
import SummarySection from "../components/SummarySection";
import TopDestination from "../components/TopDestination";
import ContactForm from "../components/ContactForm";
import { faqItems } from "../utils/Elements";
import { useGetItemQuery } from "../app/services/QuerySettings";

const Home = () => {
  
   
  return (
    <>
      <LandingBanner />
      <section className="relative ">
        <CtaBooking />
        <WelcomeBanner />
      </section>
      <section className=" container mt-[2.5rem] lg:mt-[4rem]">
        <h2 className=" mb-[2rem] text-center ">Our Services</h2>
        <ServiceCard />
      </section>
      <section className=" lg:bg-gradient-to-r from-indigo-400 from-50% to-white to-50%">
        <section className="container mt-[2.5rem] lg:mt-[4rem] lg:bg-gradient-to-r from-indigo-400 from-30% to-white to-25%">
          <SummarySection />
        </section>
      </section>

      <section className=" mt-[2rem] lg:mt-[5rem] ">
        <TopDestination />
      </section>

      <section id="cta" className=" mt-[2.5rem] lg:mt-[3rem]">
        <ContactForm />
      </section>

      <section className=" container my-[2.5rem] lg:my-[3rem]">
        <h2 className=" mb-4 ">FAQ's</h2>
        <p className=" md:w-[35%] ">
          Stuck on something ? We're here to help with all your questions and
          answers in one place.
        </p>

        <div className=" ml-[1rem] md:ml-[6rem] mt-[2rem] lg:mt-[2.5rem]">
          <Faq data={faqItems}/>
        </div>
      </section>
    </>
  );
};

export default Home;
