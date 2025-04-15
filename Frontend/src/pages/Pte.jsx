import React from 'react'
import TestClasses from '../reusables/TestClasses'
import { classesData } from '../utils/Elements'
import InfoBar from '../reusables/InfoBar';

const Pte = () => {
  const pteData=classesData[1];
  const ieltsFaq=[
    {
       ques:"How long does it takes to get the IELTS Test Scores?",
       ans:"The IELTS test score result is published online within 13 days and the hard copy is issued after 17 days from your LRW test."
    },
    {
      ques:"How to book and IELTS Date in Nepal?",
      ans:"You can book your IELTS date from the consultancy you are trying to apply for. If you don’t want to book your IELTS date from a consultancy, you can either book the test from IDP or British Council Nepal.",
    },
    {
      ques:"How long is IELTS score valid?",
      ans:"IELTS test score is valid for 2 years.",
    },
    {
      ques:"What is the duration of the IELTS test?",
      ans:"The IELTS test lasts for 3 hours which includes listening, reading and writing. Speaking test is taken separately which may last for 10 minutes to half an hour depending on the test conductor.",
    },
    {
      ques:"Are IELTS Preparation Classes available in Kathmandu?",
      ans:"Yes, If you are planning to take the IELTS Test then do Visit us. We have a special offer for you. The  Consultancy is located in Sankhamul",
    },
  ]
  return (
    <>
    <InfoBar title="Test Preparation" parentpath="Test preparation" childpath="PTE"/>
    <div className=' container mt-[1.5rem] lg:mt-[3rem]'>
      <TestClasses data={pteData} faqData={ieltsFaq}/>
    </div>
    </>
  )
}

export default Pte
