import React, { useContext, useState } from "react";
import InputField from "../reusables/InputField";
import CustomButton from "../reusables/CustomButton";
import { RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addNewRole } from "../app/slices/AddRoleSlice";
import { AdminContext } from "../layout/AdminLayout";

const Roles = () => {
  const [roleForm, setRoleForm] = useState({
    role_name: "",
    display_rolename: "",
    role_desc: "",
    selected_permissions: [],
  });

  const { permission } = useSelector((state) => state.permissionslice);
  
  const {generateUniqueId}=useContext(AdminContext);
  const dispatch=useDispatch();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (roleForm.role_name.length < 5 || roleForm.role_name.length > 25) {
      tempErrors.role_name = "Rolename must be between 5-25 characters.";
    }

    if (
      roleForm.display_rolename.length < 5 ||
      roleForm.display_rolename.length > 25
    ) {
      tempErrors.display_rolename =
        "Display Name must be between 5-25 characters.";
    }
    if (roleForm.role_desc.length < 20 || roleForm.role_desc.length > 100) {
      tempErrors.role_desc = "Description must be between 20-100 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const randomId = generateUniqueId(); // Generate a unique ID
    setRoleForm({ ...roleForm, [name]: value,id:randomId });
  };

  const handlePermissionChange = (permissionName) => {
    if (roleForm.selected_permissions.includes(permissionName)) {
      setRoleForm((prevForm) => ({
        ...prevForm,
        selected_permissions: prevForm.selected_permissions.filter(
          (perm) => perm !== permissionName
        ),
      }));
    } else {
      setRoleForm((prevForm) => ({
        ...prevForm,
        selected_permissions: [...prevForm.selected_permissions, permissionName, ],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("new role created");
      dispatch(addNewRole(roleForm));
    }
  };

  return (
    <form
      className="bg-white p-4 lg:p-6 drop-shadow rounded-md"
      onSubmit={handleSubmit}
    >
      <section className="flex justify-between items-center mb-6">
        <h5 className="font-semibold">Create New Role</h5>
        <CustomButton icon={<RxPlus />} type="submit" width="ml-auto lg:w-[15%]">
          Add Role
        </CustomButton>
      </section>
      <div className="flex lg:flex-row flex-col  justify-between gap-10">
        <div className="space-y-6 flex-1">
          <section>
            <h6 className="font-jamjure mb-2">Role Name</h6>
            <InputField
              rounded="rounded-sm"
              type="text"
              name="role_name"
              placeholder="Role Name"
              value={roleForm.role_name}
              onChange={handleChange}
              required
              error={errors.role_name}
            />
          </section>

          <section>
            <h5 className="font-jamjure mb-2">Display Name</h5>
            <InputField
              rounded="rounded-sm"
              type="text"
              name="display_rolename"
              placeholder="Display Name"
              value={roleForm.display_rolename}
              onChange={handleChange}
              error={errors.display_rolename}
              required
            />
          </section>
          <section>
            <h5 className="font-jamjure mb-2">Description</h5>
            <InputField
              rounded="rounded-sm"
              type="textarea"
              name="role_desc"
              placeholder="Description here.."
              value={roleForm.role_desc}
              onChange={handleChange}
              error={errors.role_desc}
              required
            />
          </section>
        </div>
        <div className="lg:w-[50%]">
          <h5 className="font-jamjure mb-2">Permissions</h5>
          <div className="bg-gray-100 grid grid-cols-2 lg:grid-cols-3 gap-4 rounded-sm p-4">
            {permission.map((item) => (
              <div className="flex gap-2 items-center" key={item.id}>
                <input 
                  type="checkbox"
                  checked={roleForm.selected_permissions.includes(item.name)}
                  onChange={() => handlePermissionChange(item.name)}
                />
                <span className=" text-[14px]">{item.display_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Roles;

