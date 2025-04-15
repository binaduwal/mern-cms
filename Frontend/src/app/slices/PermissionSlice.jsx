import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permission: [], 
};

export const PermissionSlice = createSlice({
  name: "permissionslice",
  initialState,
  reducers: {
    addPermission: (state, action) => {
       // Ensure state.permission is always an array
       if (!Array.isArray(state.permission)) {
        state.permission = [];
      }
      const newUser = action.payload;
      state.permission.push(newUser);
  
    },

    removePermission: (state, action) => {
        state.permission = state.permission.filter((item) => item.id !== action.payload);
      },
    
  }
});

export const { addPermission, removePermission} = PermissionSlice.actions;
export const permissionReducer = PermissionSlice.reducer;