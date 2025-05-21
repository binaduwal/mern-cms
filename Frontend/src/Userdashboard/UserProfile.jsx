import React, { useContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import UserDetails from "../reusables/UserDetails";
import { updateCredentials } from "../app/slices/SignupSlice";
import InputField from "../reusables/InputField";
import CustomButton from "../reusables/CustomButton";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { UserContext } from "../layout/UserLayout";
import CustomModal from "../reusables/CustomModal";
import { FaLink } from "react-icons/fa";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
import { BiLogoGmail } from "react-icons/bi";

const UserProfile = () => {
  const { credentials } = useSelector(
    (state) => state.signupslice,
    shallowEqual
  );
  useEffect(() => {
    console.log("sign up details: ", credentials);
  }, [credentials]); // Only runs when `credentials` changes
  
  const {openModal,modalIsOpen,closeModal}=useContext(UserContext);

  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    ...credentials,
    phone_number: credentials.phone_number || "", // Add phone number
    address: credentials.address || "", // Add address
    gender: credentials.gender || "",
    dob: credentials.dob || "",
    face_book: credentials.face_book || "",
    linked_in: credentials.linked_in || "",
  });

  const [isDetailsEditable, setIsDetailsEditable] = useState(false);

  // useCallback to prevent unnecessary function recreation
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;

    // Function to capitalize the first letter
    const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    if (name === "phone_number") {
      // Phone number validation (only digits)
      if (/^\d{0,10}$/.test(value)) {
        setFormDetails({ ...formDetails, [name]: value });
      }
    } else if (
      name === "first_name" ||
      name === "last_name" ||
      name === "address"
    ) {
      // Capitalize the first letter for specific fields
      setFormDetails({ ...formDetails, [name]: capitalizeFirstLetter(value) });
    } else {
      // For other input fields
      setFormDetails({ ...formDetails, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};
    if (
      formDetails.first_name.length < 4 ||
      formDetails.first_name.length > 15
    ) {
      tempErrors.first_name = "First Name must be betwen 5-15 characters.";
    }
    if (formDetails.last_name.length < 5 || formDetails.last_name.length > 15) {
      tempErrors.last_name = "Last Name must be betwen 5-15 characters.";
    }
    if (!/^\d{10}$/.test(formDetails.phone_number)) {
      tempErrors.phone_number = "Phone Number must be 10 digits.";
    }

    // if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(formDetails.pass_word)) {
    //   tempErrors.pass_word =
    //     "Password must contain at least one capital letter and one special character.";
    // }

    // Email validation (must end with @gmail.com)
    if (!/^[\w-\.]+@gmail\.com$/.test(formDetails.email)) {
      tempErrors.email = "Email must end with @gmail.com.";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isDetailsEditable) {
      if (validate()) {
        dispatch(updateCredentials(formDetails));
        setIsDetailsEditable(false); // Only set to false if details are saved
      }
    }
    console.log("Saving Form Details:", formDetails);
  };

  console.log("boolean:", isDetailsEditable);

  return (
    <form onSubmit={handleSave}>
      <div className=" flex flex-col lg:flex-row justify-between gap-16 ">
        <div className="font-jamjure grid grid-cols-2 gap-6 lg:w-[40%]">
          <div className="col-span-2 relative rounded-full mx-auto size-[7rem] ">
            <img
              src="https://img.freepik.com/premium-vector/portrait-avatar-male-laughter-joy-smile-calmness-cartoon-character_969393-899.jpg"
              className=" h-full w-full rounded-full"
            />
            <h3 className="bg-white right-1 absolute bottom-0 drop-shadow-lg rounded-full">
              <FiEdit className=" text-indigo-500 p-2 text-[2.2rem]  " />
            </h3>
          </div>

          {isDetailsEditable ? (
            <>
              <div className=" col-span-1">
                <h3 className=" mb-4 font-[600] font-jamjure">First Name</h3>
                <InputField error={errors.first_name}
                  rounded="rounded-lg"
                  type="text"
                  name="first_name"
                  value={formDetails.first_name}
                  onChange={handleDetailsChange}
                />
              </div>
              <div className=" col-span-1">
                <h3 className=" mb-4 font-[600] font-jamjure">Last Name</h3>
                <InputField error={errors.last_name}
                  rounded="rounded-lg"
                  type="text"
                  name="last_name"
                  value={formDetails.last_name}
                  onChange={handleDetailsChange}
                />
              </div>
              <div className=" col-span-2">
                <h3 className=" mb-4 font-[600] font-jamjure">Email</h3>
                <InputField error={errors.email}
                  rounded="rounded-lg"
                  type="text"
                  name="email"
                  value={formDetails.email}
                  onChange={handleDetailsChange}
                />
              </div>
              <div className=" col-span-2">
                <h3 className=" mb-4 font-[600] font-jamjure">Phone</h3>
                <InputField
                  required={false}
                  rounded="rounded-lg"
                  type="text"
                  name="phone_number"
                  value={formDetails.phone_number}
                  onChange={handleDetailsChange}
                  error={errors.phone_number}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-span-1">
                <UserDetails title="First Name">
                  {credentials.first_name}
                </UserDetails>
              </div>
              <div className="col-span-1 ">
                <UserDetails title="Last Name">
                  {credentials.last_name}
                </UserDetails>
              </div>
              <div className="col-span-2">
                <UserDetails title="Email" icon={<BiLogoGmail className="text-gray-400 text-[1.3rem]"/>}>{credentials.email}</UserDetails>
              </div>
              <div className="col-span-2">
                <h3 className=" mb-4 font-jamjure font-[600]">Password</h3>
                <section className=" ring-2 ring-gray-200 flex items-center justify-between px-3  rounded-md h-[2.5rem] ">
                <h3>{'*'.repeat(credentials.pass_word?.length || 8)}</h3>
                <h3 className=" text-indigo-400 font-[600] text-[12px]" onClick={openModal}>
                    CHANGE PASSWORD
                  </h3>
                  <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal} width="w-[30%]">
                  <div className=" bg-white flex flex-col gap-4 p-6 rounded-lg">
                  <h3 className=" font-jamjure">Change password</h3>
                  <section className=" flex justify-between items-center">
                   <p className=" font-jamjure">Old Password:</p>
                   <InputField type="password" rounded="rounded-lg" />
                  </section>
                  <section className=" flex justify-between items-center">
                   <p className=" font-jamjure ">New Password:</p>
                   <InputField type="password" rounded="rounded-lg" />
                  </section>
                  <section className=" flex justify-between gap-4 mt-6 items-center">
                  <CustomButton width="flex-1" color="bg-emerald-500">Save</CustomButton>
                  <CustomButton width="flex-1" color="bg-red-600" onClick={closeModal}>Cancel</CustomButton>
                  </section>
                  </div>
                  </CustomModal>
                </section>
              </div>
            </>
          )}
        </div>
        <div className=" flex-1">
          {isDetailsEditable ? (
            <div className=" mb-6 flex w-[40%] gap-2 ml-auto ">
              <CustomButton width="w-full" type="submit" color="bg-emerald-500">
                Save
              </CustomButton>
              <CustomButton
                color="bg-red-500"
                width="w-full"
                onClick={() => setIsDetailsEditable(false)} // Cancel editing
              >
                Cancel
              </CustomButton>
            </div>
          ) : (
            <div className=" mb-4 lg:mb-6 flex justify-end">
              <CustomButton
                width="w-[30%]"
                onClick={(e) => {
                  e.preventDefault(); // Prevent accidental form submission
                  setIsDetailsEditable(true); // Set to true to enable editing
                }}
              >
                Edit Profile
              </CustomButton>
            </div>
          )}

          <div className=" grid grid-cols-2 gap-6 flex-1">
            {isDetailsEditable ? (
              <>
                <div className=" col-span-2 lg:col-span-1">
                  <h3 className=" mb-4 font-[600] font-jamjure">Address</h3>
                  <InputField error={errors.address}
                    rounded="rounded-lg"
                    required={false}
                    type="text"
                    name="address"
                    value={formDetails.address}
                    onChange={handleDetailsChange}
                  />
                </div>
                <div className=" col-span-2 lg:col-span-1">
                  <h3 className=" mb-4 font-[600] font-jamjure">Gender</h3>
                  <InputField
                    rounded="rounded-lg"
                    type="select"
                    name="gender"
                    options={["Male", "Female"]}
                    value={formDetails.gender}
                    onChange={handleDetailsChange}
                  />
                </div>
                <div className=" col-span-2 lg:col-span-1">
                  <h3 className=" mb-4 font-[600] font-jamjure">
                    Date of Birth
                  </h3>
                  <InputField
                    rounded="rounded-lg"
                    required={false}
                    type="date"
                    name="dob"
                    value={formDetails.dob}
                    onChange={handleDetailsChange}
                  />
                </div>
                <div className=" col-span-2 lg:col-span-1">
                  <h3 className=" mb-4 font-[600] font-jamjure">Facebook</h3>
                  <InputField
                    rounded="rounded-lg"
                    required={false}
                    type="link"
                    name="face_book"
                    value={formDetails.face_book}
                    onChange={handleDetailsChange}
                  />
                </div>
                <div className=" col-span-2 lg:col-span-1">
                  <h3 className=" mb-4 font-[600] font-jamjure">LinkedIn</h3>
                  <InputField
                    rounded="rounded-lg"
                    required={false}
                    type="link"
                    name="linked_in"
                    value={formDetails.linked_in}
                    onChange={handleDetailsChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2 lg:col-span-1">
                  <UserDetails title="Phone" icon={<FaSquarePhoneFlip className=" text-gray-400 text-[1.3rem]"/>}>
                    {credentials.phone_number}
                  </UserDetails>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <UserDetails title="Address" icon={<TiLocation className=" text-gray-400 text-[1.3rem]"/>}>
                    {credentials.address}
                  </UserDetails>
                </div>
                <div className=" col-span-2 lg:col-span-1">
                <UserDetails title="Gender" icon={<IoMdArrowDropdown className=" text-[1.5rem]"/>} icon_color="text-gray-400">
                    {credentials.gender}
                  </UserDetails>
                </div>
                <div className=" col-span-2 lg:col-span-1">
                <UserDetails title="Date of Birth" icon={<IoMdArrowDropdown className=" text-[1.5rem]"/>} icon_color="text-gray-400">
                    {credentials.dob}
                  </UserDetails>
                </div>

                <div className=" col-span-2 lg:col-span-1">
                  <UserDetails title="Facebook" icon={<FaLink className="text-gray-400"/>} icon_color="text-indigo-400">
                    {credentials.face_book}
                  </UserDetails>
                </div>
                <div className=" col-span-2 lg:col-span-1">
                  <UserDetails title="LinkedIn" icon={<FaLink className=" text-gray-400"/>} icon_color="text-indigo-400">
                    {credentials.linked_in}
                  </UserDetails>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
