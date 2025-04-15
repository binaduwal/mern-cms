import React, { useContext, useState } from "react";
import CustomButton from "../reusables/CustomButton";
import { RxCross2, RxPlus } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import CustomModal from "../reusables/CustomModal";
import { AdminContext } from "../layout/AdminLayout";
import InputField from "../reusables/InputField";
import { addPermission, removePermission } from "../app/slices/PermissionSlice";
import { useDispatch, useSelector } from "react-redux";

const Permissions = () => {
  const { closeModal, modalIsOpen, openModal,generateUniqueId } = useContext(AdminContext);
  const { permission: data } = useSelector((state) => state.permissionslice);
  const dispatch = useDispatch();
  console.log("pm:", data);

  const [permission, setPermission] = useState({
    name: "",
    display_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const randomId = generateUniqueId(); // Generate a unique ID
    setPermission({ ...permission, [name]: value, id: randomId });
  };
  

  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (permission.name.length < 5 || permission.name.length > 25) {
      tempErrors.name = "Name must be between 5-25 characters.";
    }

    if (
      permission.display_name.length < 5 ||
      permission.display_name.length > 25
    ) {
      tempErrors.display_name = "Display Name must be between 5-25 characters.";
    }

    if (
      permission.description.length < 20 ||
      permission.description.length > 100
    ) {
      tempErrors.description = "Description must be between 20-100 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("New permision added");
      dispatch(addPermission(permission));
      closeModal();
      console.log("permission list:", permission);
    }
  };
  return (
    <>
      <div className=" flex justify-between">
        <div className="relative bg-gray-200 rounded-md w-[40%] lg:w-auto">
          <input
            type="text"
            className="pl-10 pr-4 py-2 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur w-24 md:w-[50%]"
            placeholder="Search..."
          />
          <section className="absolute inset-y-0 flex items-center pl-2">
            <IoIosSearch className="lg:text-2xl text-lg" />
          </section>
        </div>
        <CustomButton
          icon={<RxPlus />}
          onClick={openModal}
          width=" ml-auto lg:w-[15%] xl:w-[17%]"
        >
          Create Permissions
        </CustomButton>
        <CustomModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          width="w-[95%] lg:w-[35%]"
        >
          <form onSubmit={handleSubmit}>
            <div className=" space-y-6 bg-white p-4 lg:p-6 drop-shadow rounded-md ">
              <h3 className=" mb-6 font-poppins">Create New Permission</h3>
              <section>
                <h3 className="font-jamjure mb-2">Permission Name</h3>
                <InputField
                  rounded="rounded-sm"
                  type="text"
                  name="name"
                  placeholder="User Name"
                  value={permission.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
                />
              </section>

              <section>
                <h3 className="font-jamjure mb-2">Display Name</h3>
                <InputField
                  rounded="rounded-sm"
                  type="text"
                  name="display_name"
                  placeholder="Display Name"
                  value={permission.display_name}
                  onChange={handleChange}
                  error={errors.display_name}
                  required
                />
              </section>
              <section>
                <h3 className="font-jamjure mb-2">Description</h3>
                <InputField
                  rounded="rounded-sm"
                  type="textarea"
                  name="description"
                  placeholder="Description here.."
                  value={permission.description}
                  onChange={handleChange}
                  error={errors.description}
                  required
                />
              </section>
              <CustomButton type="submit">Create Permission</CustomButton>
            </div>
          </form>
        </CustomModal>
      </div>

      <table className=" min-w-[700px] lg:min-w-full lg:overflow-x-hidden overflow-x-scroll mt-6">
        <thead className=" bg-indigo-400 text-white ">
          <tr>
            <Th width="5%">SN</Th>
            <Th>Name</Th>
            <Th>Display Name</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => {
            return (
              <tr key={idx}>
                <Td >{idx + 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.display_name}</Td>
                <Td>{item.description}</Td>
                <Td><CustomButton color="bg-red-600" onClick={()=>dispatch(removePermission(item.id))} icon={<RxCross2/>}>Delete</CustomButton></Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Permissions;

const Th = ({ children, width }) => {
  return (
    <th
      className={` py-2.5 px-2 text-left font-medium border-r border-r-gray-100`}
      style={{ width }}
    >
      {children}
    </th>
  );
};

const Td = ({ children }) => {
  return <td className=" py-[4px] px-2 border-r border-l border-b border-r-gray-200 font-[400] text-[14px] ">{children}</td>;
};
