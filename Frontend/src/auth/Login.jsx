import React, { useState } from "react";
import InputField from "../reusables/InputField";
import { useDispatch } from "react-redux";
import { signIn } from "../app/slices/SignupSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    pass_word: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    // Email validation (must end with @gmail.com)
    if (!/^[\w-\.]+@gmail\.com$/.test(form.email)) {
      tempErrors.email = "Email must end with @gmail.com.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Log in successful");
      navigate("/");
      console.log("Login details:", form);
    }
  };
  return (
    <div className=" 3xl:h-[60vh] content-center bg-indigo-50">
      <div className=" lg:flex lg:w-[60%] xl:w-[55%]  mx-auto bg-white drop-shadow-lg p-2 rounded-xl mt-10 mb-10 ">
        <div className="relative flex lg:w-[50%] p-4 rounded-[2rem] justify-between">
          <div
            className="absolute inset-0 bg-center bg-cover rounded-[10px] bg-no-repeat contrast-75 brightness-75"
            style={{
              backgroundImage: `url("https://3.bp.blogspot.com/-PdpfeWWSY4U/XZqAZSk8o2I/AAAAAAAAPCs/EqLsLTktE6gMvSlWUZW5oB_se-cw-Lc1gCLcBGAsYHQ/w919/digital-art-landscape-uhdpaper.com-4K-4.1003-wp.thumbnail.jpg")`,
            }}
          />
          <div className=" flex flex-col justify-between w-full">
            <section className=" flex justify-between items-center">
              <h3 className=" text-white font-jamjure font-semibold relative">
                LOGO
              </h3>
              <button
                onClick={() => navigate("/")}
                className=" font-jamjure text-[12px] flex gap-2 font-[500] h-fit items-center bg-white/40 backdrop-blur-lg py-1 px-3 rounded-2xl hover:translate-x-1.5 duration-300"
              >
                Back to website <FaArrowRight />
              </button>
            </section>
            <h2 className="relative text-center text-white mb-6 font-jamjure">
              Capturing Moments,
              <br />
              Creating Memories
            </h2>
          </div>
        </div>
        <div className=" flex-1 p-[2.5rem] rounded-[1rem]">
          <h1 className=" text-indigo-400 text-[2rem] mb-4 font-jamjure">
            Log In
          </h1>
          <p className=" font-[500] font-poppins mb-8">
            Don't have an account?{" "}
            <span className=" underline text-indigo-400">Sign in</span>
          </p>
          <form onSubmit={handleSubmit} className=" ">
            <div className="grid grid-cols-2 gap-4 ">
              <section className=" col-span-2">
                <InputField
                  id="email"
                  name="email"
                  value={form.email}
                  type="email"
                  onChange={handleChange}
                  rounded="rounded-md"
                  placeholder="Email"
                  error={errors.email}
                />
              </section>
              <section className=" col-span-2">
                <InputField
                  id="password"
                  name="pass_word"
                  value={form.pass_word}
                  placeholder="Password"
                  rounded="rounded-md"
                  type="password"
                  onChange={handleChange}
                  error={errors.pass_word}
                />
              </section>
            </div>
            <button
              className=" font-poppins font-[400] w-full rounded-lg mt-8 flex justify-center bg-gradient-to-r from-indigo-500 to-indigo-400 py-2.5 text-[1rem] "
              type=" submit"
            >
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
