import React, { useState } from "react";
import CustomButton from "../reusables/CustomButton";
import InputField from "../reusables/InputField";
import { useDispatch, useSelector } from "react-redux";
import UserMgmt from "./UserMgmt";
import { addUser } from "../app/slices/RoleSlice";

const AddUserForm = () => {
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    pass_word: "",
    confirm_pass: "",
    status: [],
    user_role: "",
  });
  
  const { roles } = useSelector((state) => state.addroleslice);
  const { details } = useSelector((state) => state.roleslice);
  console.log("user list:", details);
  console.log("roles:", roles);
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (user.user_name.length < 5 || user.user_name.length > 25) {
      tempErrors.user_name = "Username must be between 5-25 characters.";
    }
    if (!/^[\w-\.]+@gmail\.com$/.test(user.email)) {
      tempErrors.email = "Email must end with @gmail.com.";
    }
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(user.pass_word)) {
      tempErrors.pass_word =
        "Password must contain at least one capital letter and one special character.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = {
        id: new Date().getTime(),
        ...user,
      };
      alert("New User Posted");
      dispatch(addUser(newUser));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomButton type="submit" width=" ml-auto lg:w-[15%]">
        Create User
      </CustomButton>
      <div className="flex flex-col lg:flex-row gap-6 my-6 w-full justify-between">
        <div className=" space-y-6 lg:w-[90%] bg-white p-4 lg:p-6 drop-shadow rounded-md">
          <h5 className="bg-indigo-100 p-2 mb-6 font-semibold">
            Create New User
          </h5>
          <section className="pl-4">
            <h6 className="font-jamjure mb-2">User Name</h6>
            <InputField
              rounded="rounded-sm"
              type="text"
              name="user_name"
              placeholder="User Name"
              value={user.user_name}
              onChange={handleChange}
              required
              error={errors.user_name}
            />
          </section>

          <section className="pl-4">
            <h6 className="font-jamjure mb-2">Email</h6>
            <InputField
              rounded="rounded-sm"
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </section>

          <div className="flex justify-between items-center gap-4 pl-4">
            <section className="flex-1">
              <h6 className="font-jamjure mb-2">Password</h6>
              <InputField
                rounded="rounded-sm"
                type="password"
                name="pass_word"
                placeholder="Password"
                value={user.pass_word}
                onChange={handleChange}
                error={errors.pass_word}
                required
              />
            </section>
            <section className="flex-1">
              <h6 className="font-jamjure mb-2">Confirm Password</h6>
              <InputField
                rounded="rounded-sm"
                type="password"
                name="confirm_pass"
                placeholder="Password"
                value={user.confirm_pass}
                onChange={handleChange}
                error={errors.confirm_pass}
                required
              />
            </section>
          </div>

          <section className="flex gap-2 pl-4">
            <InputField
              type="checkbox"
              options={["Active User"]}
              value={user.status}
              name="status"
              onChange={handleChange}
            />
          </section>

          <section className="pl-4 ">
            <h6 className=" mb-2">Select Role</h6>
            <InputField
              type="radio"
              name="user_role"
              value={user.user_role}
              options={roles?.map((role) => role.display_rolename)}
              onChange={handleChange}
              error={errors.user_role}
              required
            />
          </section>
        </div>
        <div className=" w-fit lg:w-full bg-white p-4 lg:p-6 drop-shadow rounded-md h-fit">
          <h5 className="bg-indigo-100 p-2 mb-2 font-semibold">Users List</h5>
          <UserMgmt />
        </div>
      </div>
    </form>
  );
};

export default AddUserForm;
