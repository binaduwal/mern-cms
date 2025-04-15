import React from 'react';

const TableButton = ({ onClick, type, children,width,icon,textcolor}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` flex items-center bg-white ${textcolor} gap-[3px] px-0 font-semibold duration-500 ease-in-out text-[11px] lg:text-[13px] ${width}`}
    > 
    <span className={` text-[1.2rem] `}>{icon}</span>
      {children}
    </button>
  );
};

export default TableButton;