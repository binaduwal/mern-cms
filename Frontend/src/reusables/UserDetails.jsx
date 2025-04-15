import React from "react";

const UserDetails = ({ children, title,icon,icon_color }) => {
  return (
    <>
      <h3 className=" mb-4 font-jamjure font-[600]">{title}</h3>
      <h3 className=" ring-2 ring-gray-200 flex items-center justify-between px-3  rounded-md h-[2.5rem] ">
       
        {children}
        <span className={` ${icon_color}`} >{icon}</span>
      </h3>
    </>
  );
};

export default React.memo(UserDetails);
