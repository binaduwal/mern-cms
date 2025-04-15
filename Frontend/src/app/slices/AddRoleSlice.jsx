import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [], 
};

export const AddRoleSlice = createSlice({
  name: "addroleslice",
  initialState,
  reducers: {
    addNewRole: (state, action) => {
       // Ensure state.roles is always an array
       if (!Array.isArray(state.roles)) {
        state.roles = [];
      }
      const newRole = action.payload;
      state.roles.push(newRole);
  
    },

    removeOldRole: (state, action) => {
        state.roles = state.roles.filter((item) => item.id !== action.payload);
      },
    
  }
});

export const { addNewRole, removeOldRole} = AddRoleSlice.actions;
export const addRoleReducer = AddRoleSlice.reducer;