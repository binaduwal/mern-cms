import React, { useState } from 'react';
import { useAddItemMutation, useGetItemQuery } from '../../app/services/QuerySettings';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
const initialValues={
    name:'',
    password:'',
    refRole:'',
    role:'admin',
    email:"",
}
const UserForm = () => {
      const { data: apiResponse} = useGetItemQuery(
        { url: "/roles/all" },
        { refetchOnMountOrArgChange: true } 
      );

      

   const roles = apiResponse || [];


 const [addItem, { error, isLoading }] = useAddItemMutation();
  const navigate = useNavigate();
 
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: "",
      onSubmit: async (values, action) => {
        try {
          const response = await addItem({
            url: "/auth/register",
            data: values,
          }).unwrap();
 
          console.log("Response Data:", response);
          action.resetForm();
          alert("Created Succesfully")
        } catch (err) {
          console.error(" error:", err);
       
        }
        console.log("data:", values)
      },
    });
 
  if (isLoading) {
    console.log("Submitting...");
  }

  return (
<>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Create User</h2>
    <form onSubmit={handleSubmit}>
<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>        <input
            type='text'
            placeholder='Enter your name'
            id='text'
            name='name'
            onChange={handleChange}
            value={values.name}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

        />
        <label>Email</label>
        <input
            type='email'
            placeholder='Enter your email'
            id='email'
            name='email'
            onChange={handleChange}
            value={values.email}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm mb-1"
        />
        <label>Password</label>
        <input
            type='password'
            placeholder='Enter your password'
            id='password'
            name='password'
            onChange={handleChange}
            value={values.password}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm mb-1"
        />
        <label>Role</label>
        <select
        id="refRole"
        name="refRole"
        required
        onChange={handleChange}
        value={values.refRole}
        className="mt-1  border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"

        >
            <option value=''>Select Role</option>
{
    roles.map((role) => {
            return (
                <option key={role._id} value={role._id}>{role.name}</option>
            )
        })
}
        </select>

        <button
        type='submit'
        className=" mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save</button>
    </form>
</div>
</>  )
}

export default UserForm