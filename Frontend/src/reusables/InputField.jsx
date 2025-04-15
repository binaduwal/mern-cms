import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const InputField = ({
  type = "text",
  name,
  id,
  value,
  rounded,
  placeholder,
  onChange,
  icon,
  error,
  required = true,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (option) => {
    if (value.includes(option)) {
      onChange({
        target: {
          name,
          value: value.filter((item) => item !== option),
        },
      });
    } else {
      onChange({
        target: {
          name,
          value: [...value, option],
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-1">
      {type === "select" ? (
        <select
          name={name}
          icon={icon}
          value={value}
          onChange={onChange}
          required={required}
          className={`px-2 py-3 border-b-2 ${rounded} bg-gray-100 duration-300 ${
            error ? "border-b-red-600" : "border-gray-200"
          }`}
        >
          <option value="" disabled >
            {placeholder} 
          </option>
          {options &&
            options.map((option) => (
              <option key={option} value={option} className=" bg-white">
                {option}
              </option>
            ))}
        </select>
      ) : type === "radio" ? (
        <div className="space-y-2">
          {options &&
            options.map((option) => (
              <label key={option} className="flex items-center gap-x-2">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={value === option}
                  onChange={onChange}
                  required={required}
                  className="form-radio h-4 w-4 text-indigo-400 border-gray-300 focus:ring-indigo-400"
                />
                {option}
              </label>
            ))}
        </div>
      ) : type === "checkbox" ? (
        <div className="space-y-2">
          {options &&
            options.map((option) => (
              <label key={option} className="flex items-center gap-x-2 text-[12px] font-montserrat">
                <input
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={value.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="size-4 checked:bg-emerald-500 text-indigo-400 border-gray-300 focus:ring-indigo-400"
                />
                {option}
              </label>
            ))}
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={`px-2 py-3 ${rounded} border-2 bg-gray-50 w-full outline-none ${
            error ? "border-b-red-600" : "border-b-gray-200"
          }`}
        />
      ) : (
        <div className="relative w-full">
          <input
            id={id}
            type={type === "password" && showPassword ? "text" : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className={`px-2.5 py-3 ${rounded} border-2 bg-gray-50 w-full outline-none ${
              error ? "border-b-red-600 " : " border-b-gray-200"
            }`}
          />
          {type === "password" ? (
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-4 cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          ):(
            <span className="absolute right-2.5 top-3.5 cursor-pointer text-zinc-400 text-[1.3rem]">
              {icon}
            </span>
          )}
        </div>
      )}
      {error && <span className="text-red-600 text-[11px]">{error}</span>}
    </div>
  );
};

export default React.memo(InputField);
