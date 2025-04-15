import React from "react";
import TestClasses from "../reusables/TestClasses";
import { classesData } from "../utils/Elements";
import InfoBar from "../reusables/InfoBar";

const Ielts = () => {
  const ieltsData = classesData[0];
  const ieltsFaq = [
    {
      id: 1,
      ques: "How long does it takes to get the IELTS Test Scores?",
      ans: "The IELTS test score result is published online within 13 days and the hard copy is issued after 17 days from your LRW test.",
    },
    {
      id: 2,
      ques: "How to book and IELTS Date in Nepal?",
      ans: "You can book your IELTS date from the consultancy you are trying to apply for. If you don’t want to book your IELTS date from a consultancy, you can either book the test from IDP or British Council Nepal.",
    },
    {
      id: 3,
      ques: "How long is IELTS score valid?",
      ans: "IELTS test score is valid for 2 years.",
    },
    {
      id: 4,
      ques: "What is the duration of the IELTS test?",
      ans: "The IELTS test lasts for 3 hours which includes listening, reading and writing. Speaking test is taken separately which may last for 10 minutes to half an hour depending on the test conductor.",
    },
    {
      id: 5,
      ques: "Are IELTS Preparation Classes available in Kathmandu?",
      ans: "Yes, If you are planning to take the IELTS Test then do Visit us. We have a special offer for you. The  Consultancy is located in Sankhamul",
    },
  ];
  return (
    <div className=" bg-white">
      <InfoBar
        title="Test Preparation"
        parentpath="Test preparation"
        childpath="IELTS"
      />
      <div className=" container mt-[2rem] lg:mt-[3rem]">
        <TestClasses data={ieltsData} faqData={ieltsFaq}/>
      </div>
    </div>
  );
};

export default Ielts;
