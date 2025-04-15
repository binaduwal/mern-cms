import React from "react";
import Testimonials from "../reusables/Testimonials";
import InfoBar from "../reusables/InfoBar";
import TheTeam from "../components/TheTeam";

const Introduction = () => {
  const numberItems=[
    {
      num:25,
      desc:"Years of working"
    },
    {
      num:30,
      desc:"Goals achieved"
    },
  ]
  const infoItems=[
    { 
      icon:"/assets/clock.png",
      title:"Fast Process",
      desc:"Ea ut deserunt cupidatat exercitation amet laborum eu fugiat velit proident adipisicing."
    },
    {
      title:"Smartly Execute",
      icon:"/assets/light-bulb.png",
      desc:"Ea ut deserunt cupidatat exercitation amet laborum eu fugiat velit proident adipisicing."
    },
    {
      title:"Carefully Planned",
      icon:"/assets/pencil.png",
      desc:"Ea ut deserunt cupidatat exercitation amet laborum eu fugiat velit proident adipisicing."
    },
    {
      title:"Perfect Consultants",
      icon:"/assets/talk.png",
      desc:"Ea ut deserunt cupidatat exercitation amet laborum eu fugiat velit proident adipisicing."
    },
  ]

  const goalList=[
    {
      title:"Our Goal",
      desc:"Voluptate esse mollit sit ipsum incididunt. Deserunt incididunt labore ad labore. Voluptate aliquip ea ex anim enim consectetur."
    },
    {
      title:"Our Vision",
      desc:"Voluptate esse mollit sit ipsum incididunt. Deserunt incididunt labore ad labore. Voluptate aliquip ea ex anim enim consectetur."
    },
    {
      title:"Our Strategy",
      desc:"Voluptate esse mollit sit ipsum incididunt. Deserunt incididunt labore ad labore. Voluptate aliquip ea ex anim enim consectetur."
    },
  ]
  return (
    <section className=" bg-white">
      <InfoBar title="ABOUT US" parentpath="HOME" childpath="ABOUT" />
      <section className=" container md:flex mt-[2.5rem] md:mt-[3rem] items-center">
       <div className=" md:w-[40%] ">
        <img src="https://laurelseducation.co.uk/wp-content/uploads/2021/04/LE-Blog-Pic-1.jpg" className=" rounded-sm object-cover h-[16rem] sm:h-[26rem] md:h-[32rem] md:w-[90%]"/>
        </div>
        <section className="md:flex-1 relative">
        <div className=" bg-white p-7 md:p-10  h-fit drop-shadow-md relative md:-left-[4.7rem]">
          <p className=" mb-2 ">WELCOME TO SYSQUBE</p>
          <h4 className=" mb-4">WHO WE ARE </h4>
          <p className=" leading-normal mb-7 ">The SysQube Consultancy has a long standing reputation of being one of the most comprehensive study abroad consultants in Nepal. Our Corporate office is at Dillibazar, Kathmandu, Nepal. We have a support office in Sydney, Australia and branches at Dillibazar, Kathmandu, Narayanghat, Pokhara, Nawalparasi, Parsa, Bhairahawa,Biratnagar, Damak, Butwal in Nepal.</p>
          <button className=" rounded-none">MEET THE TEAM</button>
        </div>
        <div className=" flex gap-10 mt-[1.7rem] justify-center md:justify-start">
          {
            numberItems.map((item,idx)=>{
              return(
                <div key={idx} className=" text-center">
                 <h3>{item.num} +</h3>
                 <p className=" caption">{item.desc}</p>
                </div>
              )
            })
          }
        </div>
        </section>
      </section>

      <section className=" mt-[2.5rem] md:mt-[4rem] container md:flex flex-row-reverse justify-between gap-16 items-center">
         <div className=" md:w-[40%] space-y-4 relative">
         <img src="https://www.grekoprinting-comixwellspring.com/product_images/uploaded_images/425426378.jpg" className=" rounded-sm h-[14rem] sm:h-[16rem] md:h-[18rem] w-full object-cover "/>
         <div className=" p-4 z-[2] md:block hidden absolute -left-[5.2rem] top-[30%] text-center bg-white ">
             <h4 className=" text-white py-8 px-14 bg-indigo-900">Today,<br/> Tommorow,<br/> Together.</h4>
         </div>
         <img src="https://th.bing.com/th/id/OIP.m08TLiHMtwRksWWq-9J6qwHaE8?rs=1&pid=ImgDetMain" className="h-[14rem] sm:h-[16rem] md:h-[18rem] rounded-sm w-full object-cover "/>

         </div>
         <section className=" md:w-[48%] mt-[2rem] md:mt-0">
          <h3 className=" mb-6">Let <span className=" text-indigo-400">tommorow</span> begin <span className=" text-indigo-400">today.</span></h3>
          <p className=" mb-11">Dolore enim Lorem sunt quis ea voluptate duis labore est Lorem minim. Reprehenderit est consequat sit commodo veniam. Est nisi qui do Lorem nisi proident dolore magna ut laborum. Non ex mollit enim enim dolor eu sit elit dolor ex ullamco voluptate nulla.</p>
          <div className=" space-y-7">
            {
              goalList.map((list,idx)=>{
                return(
                  <div key={idx}>
                   <h5 className=" mb-4 border-l-[4.5px] border-indigo-400 px-3 py-[1px]">{list.title}</h5>
                   <p>{list.desc}</p>
                  </div>
                )
              })
            }
          </div>
         </section>
      </section>

      <section className=" bg-gray-100 mt-[3rem] md:mt-[4rem]">
      <div className=" container py-[3.5rem] md:py-[7.5rem] lg:flex justify-between gap-10 items-center">
      <div className=" flex-1"> 
         <h4 className=" mb-4">WHY CHOOSE US</h4>
         <p className=" mb-8 ">Mollit elit proident labore irure dolore proident anim eu ea do aliquip cillum. Enim tempor deserunt cillum pariatur officia do. Id est non officia quis Lorem. Deserunt incididunt velit veniam reprehenderit aute ea laboris.</p>
         <button className=" rounded-none">START TODAY</button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-[60%] mt-[2.5rem] lg:mt-0">
          {
            infoItems.map((item,idx)=>{
              return(
                <div className=" flex gap-5 bg-white px-6 pt-6 pb-8 drop-shadow" key={idx}>
                 <img src={item.icon} className=" h-[2.4rem] mt-[5.5px]"/>

                 <div>
                  <h6 className=" mb-2">{item.title}</h6>
                  <p className=" caption">{item.desc}</p>
                 </div>
                </div>
              )
            })
          }
      </div>
      </div>
      </section>
      <div className="container space-y-4  mt-2 lg:mt-[4rem]">
        <h3 className="md:w-[40%] leading-snug md:leading-normal ">Meet our team of experts in consultancy</h3>
        <p className="md:w-[65%] lg:w-[51%] ">
          To be the company our students want us to be, it takes an electric
          group of pasionate operators. Get to know the people leading the way.
        </p>
      </div>
      <TheTeam />
      <Testimonials />
    </section>
  );
};

export default Introduction;


