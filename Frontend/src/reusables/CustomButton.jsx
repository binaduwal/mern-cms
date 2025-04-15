import React from 'react';

const CustomButton = ({ onClick, type, color, children,width,icon,flex_1}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} font-jamjure flex items-center justify-center ${flex_1} gap-2 hover:brightness-75 hover:text-gray-950 text-white rounded-lg font-semibold transition hover:translate-y-0.5 duration-500 ease-in-out drop-shadow-md text-[12px] lg:text-sm py-3 px-3 ${width}`}
    > 
    <span className={` text-[1.3rem] text-white `}>{icon}</span>
      {children}
    </button>
  );
};

export default CustomButton;