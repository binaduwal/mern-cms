import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: [], 
};

export const UserRoleSlice = createSlice({
  name: "roleslice",
  initialState,
  reducers: {
    addUser: (state, action) => {
       // Ensure state.details is always an array
       if (!Array.isArray(state.details)) {
        state.details = [];
      }
      const newUser = action.payload;
      state.details.push(newUser);
  
    },
    updateRole: (state, action) => {
      const { id, newRole } = action.payload;
      const userIndex = state.details.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.details[userIndex].user_role = newRole;
      }
    },
    removeUser: (state, action) => {
        state.details = state.details.filter((item) => item.id !== action.payload);
      },
    
  }
});

export const { addUser, removeUser,updateRole } = UserRoleSlice.actions;
export const userRoleReducer = UserRoleSlice.reducer;