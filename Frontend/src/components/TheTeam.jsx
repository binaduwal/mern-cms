import React from 'react'
import { CgInstagram } from 'react-icons/cg'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'

const TheTeam = () => {
  const teamMembers=[
    {
      name:"Steven Smith",
      role:"Assistance Manager",
      img:"https://m.media-amazon.com/images/M/MV5BOTczYTQ2M2QtYWE5YS00ZDRmLTgwMGMtY2MyMWRkNjE1ODIyXkEyXkFqcGdeQXVyMTY5Mjg5NzQw._V1_FMjpg_UX1000_.jpg",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"Will Jones",
      role:"Assistance Manager",
      img:"https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"John Doe",
      role:"C.E.O",
      img:"https://www.davispolk.com/sites/default/files/styles/teaser_headshot/public/lawyer-images/29646_jbunn_2.jpg?itok=vwQy-bt8",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"Steven Smith",
      role:"Head Manager",
      img:"https://m.media-amazon.com/images/M/MV5BOTczYTQ2M2QtYWE5YS00ZDRmLTgwMGMtY2MyMWRkNjE1ODIyXkEyXkFqcGdeQXVyMTY5Mjg5NzQw._V1_FMjpg_UX1000_.jpg",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"Steven Smith",
      role:"Consultant",
      img:"https://m.media-amazon.com/images/M/MV5BOTczYTQ2M2QtYWE5YS00ZDRmLTgwMGMtY2MyMWRkNjE1ODIyXkEyXkFqcGdeQXVyMTY5Mjg5NzQw._V1_FMjpg_UX1000_.jpg",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"Steve Lamar",
      role:"Accountant",
      img:"https://th.bing.com/th/id/OIP.DDDqjtCOJusOppCFla6C5gHaES?rs=1&pid=ImgDetMain",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"John China",
      role:"Assistance Manager",
      img:"https://th.bing.com/th/id/OIP.t75bNhJyH_2gq1pNHCMDpwHaE7?w=1000&h=665&rs=1&pid=ImgDetMain",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
    {
      name:"Morgan Will",
      role:"Assistance Manager",
      img:"https://th.bing.com/th/id/OIP.kZmI5R3I1qXNnBrKLXsd6gHaEh?w=1600&h=978&rs=1&pid=ImgDetMain",
      facebook:"",
      insta:"",
      linkedIn:"",
    },
  ]
  return (
    <section className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-9 container'>
      
      {
       teamMembers.map((person,idx)=>{
        return(
          <section key={idx}>
          <section className="group hover:border-y hover:border-l border-indigo-400 rounded brightness-95 hover:brightness-100 duration-500 h-[13rem] md:h-[16rem] lg:h-[18rem] relative group flex justify-end items-end " key={idx}>
            <div
              className="absolute inset-0 bg-center rounded-sm bg-cover bg-no-repeat "
              style={{
                backgroundImage: `url(${person.img})`,
              }}
            />
             <div className=' rounded-br-sm group-hover:border-t group-hover:border-l transition  border-indigo-400 flex flex-col gap-2 relative right-0.5 bottom-0.5 bg-neutral-800 backdrop-blur p-1.5'>
              <h6 className=' px-2.5 py-3 bg-neutral-700 drop-shadow'><FaFacebookF className=' text-indigo-400 text-[1.3rem]'/></h6>
              <h6 className=' px-2.5 py-3 bg-neutral-700 drop-shadow'><FaLinkedinIn className=' text-indigo-400 text-[1.3rem]'/></h6>
              <h6 className=' px-2.5 py-3 bg-neutral-700 drop-shadow'><CgInstagram className=' text-indigo-400 text-[1.3rem]'/></h6>
             </div>
          </section>
          <section className=' mt-3'>
            <p className=' font-semibold mb-1'>{person.name}</p>
            <p className=' caption text-indigo-400'>{person.role}</p>
          </section>
          </section>
        )
       })
      }
    </section>
  )
}

export default TheTeam
