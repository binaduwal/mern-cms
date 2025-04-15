import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: null, 
};

export const SignupInfo = createSlice({
  name: "signupslice",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const registerCredentials = action.payload;
      state.credentials = registerCredentials; 
    },

    updateCredentials: (state, action) => {
      const updatedCredentials = action.payload;
      // Merge the existing credentials with the updated credentials
      state.credentials = { ...state.credentials, ...updatedCredentials }; 
    },
    
  }
});

export const { signIn, removecredentials,updateCredentials } = SignupInfo.actions;
export const signUpReducer = SignupInfo.reducer;