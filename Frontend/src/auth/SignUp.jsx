import React, { useState } from "react";
import InputField from "../reusables/InputField";
import { useDispatch } from "react-redux";
import { signIn } from "../app/slices/SignupSlice"; 
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "", 
    accept: false,
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Function to capitalize the first letter
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    if (name === "accept") {
      setForm({ ...form, [name]: e.target.checked });
    } else if (name === "phone_number") {
      // Phone number validation (only digits)
      if (/^\d{0,10}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "first_name" || name === "last_name") {
      // Capitalize the first letter for specific fields
      setForm({ ...form, [name]: capitalizeFirstLetter(value) });
    } else {
      // For other input fields
      setForm({ ...form, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (!form.first_name.trim()) {
      tempErrors.first_name = "First name is required.";
    } else if (form.first_name.length < 2 || form.first_name.length > 50) {
      tempErrors.first_name = "First name must be between 2-50 characters.";
    }
    if (!form.last_name.trim()) {
      tempErrors.last_name = "Last name is required.";
    } else if (form.last_name.length < 2 || form.last_name.length > 50) {
      tempErrors.last_name = "Last name must be between 2-50 characters.";
    }
    if (!form.password) {
      tempErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    } else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(form.password)) {
      tempErrors.password =
        "Password must contain an uppercase letter and a special character.";
    }
    // More general email validation
    if (!form.email) {
      tempErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!form.accept) {
      tempErrors.accept = "You must agree to the terms and conditions.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        password: form.password,
      };
      dispatch(signIn(userData))
        .unwrap() // Use unwrap to handle the promise from createAsyncThunk
        .then((responsePayload) => {
          // Assuming signIn thunk dispatches setCredentials on success
          // and returns the backend response (user data + token)
          alert("Sign up successful!"); // Or a more subtle success message/redirect
          navigate("/"); // Navigate to home or dashboard
        })
        .catch((errorPayload) => {
          setErrors({ api: errorPayload || "Sign up failed. Please try again." });
          console.error("Signup error:", errorPayload);
        });
    }
  };
  return (
    <div className=" 3xl:h-[65vh] content-center bg-indigo-50">
      <div className=" container flex flex-col lg:flex-row gap-4 lg:gap-0 lg:w-[70%] xl:w-[65%]  mx-auto bg-white drop-shadow-lg p-2 rounded-xl mt-10 mb-20 ">
        <div className="relative flex lg:w-[50%] p-4 rounded-[2rem] justify-between">
          <div
            className="absolute inset-0 bg-center bg-cover rounded-[10px] bg-no-repeat contrast-75 brightness-75"
            style={{
              backgroundImage: `url("https://3.bp.blogspot.com/-PdpfeWWSY4U/XZqAZSk8o2I/AAAAAAAAPCs/EqLsLTktE6gMvSlWUZW5oB_se-cw-Lc1gCLcBGAsYHQ/w919/digital-art-landscape-uhdpaper.com-4K-4.1003-wp.thumbnail.jpg")`,
            }}
          />
          <div className=" flex flex-col justify-between w-full">
          <section className=" flex justify-between items-center">
          <h5 className=" text-white font-jamjure font-semibold relative">
            LOGO
          </h5>
          <button onClick={()=>navigate("/")} className=" font-jamjure text-[12px] flex gap-2 font-[500] h-fit items-center bg-white/40 backdrop-blur-lg py-1 px-3 rounded-2xl hover:translate-x-1.5 duration-300" >
            Back to website <FaArrowRight />
          </button>
          </section>
          <h5 className="relative text-center text-white mb-6 font-jamjure">Capturing Moments,<br/>Creating Memories</h5>
          </div>
        </div>
        <div className=" flex-1 p-2 lg:p-[2.5rem] rounded-[1rem]">
          <h3 className=" text-indigo-400 mb-4 ">
            Create an account
          </h3>
          <p className=" mb-8">
            Already have an account?{" "}
            <Link to="/login" className=" underline text-indigo-400 cursor-pointer">
              Log in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className=" ">
            <div className="grid grid-cols-2 gap-4 ">
              <section className="col-span-2 lg:col-span-1">
                <InputField
                  id="firstname"
                  name="first_name"
                  rounded="rounded-md"
                  value={form.first_name}
                  type="text"
                  onChange={handleChange}
                  error={errors.first_name}
                  placeholder="First Name"
                />
              </section>
              <section className="col-span-2 lg:col-span-1">
                <InputField
                  id="lastname"
                  name="last_name"
                  value={form.last_name}
                  rounded="rounded-md"
                  type="text"
                  onChange={handleChange}
                  placeholder="Last Name"
                  error={errors.last_name}
                />
              </section>
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
                  name="password" 
                  value={form.password} 
                  placeholder="Password"
                  rounded="rounded-md"
                  type="password"
                  onChange={handleChange}
                  error={errors.password} 
                />
              </section>
              <section className="col-span-2">
                <label htmlFor="acceptTerms" className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="accept"
                    checked={form.accept}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="font-poppins text-[13px] font-[500]">
                    I agree to{" "}
                    <span className="text-indigo-500 underline">Terms & Condition</span>
                  </span>
                </label>
              </section>
              {errors.accept && (
                <p className="col-span-2 text-red-500 text-sm">{errors.accept}</p>
              )}
            </div>
            <button
              className=" font-poppins font-[400] w-full rounded-lg mt-8 flex justify-center bg-gradient-to-r from-indigo-500 to-indigo-400 py-2.5 text-[1rem] "
              type=" submit"
            >
              Register{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
