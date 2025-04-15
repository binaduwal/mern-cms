import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null, 
};

export const inquiryMessage = createSlice({
  name: "inquiryslice",
  initialState,
  reducers: {
    inquiryDesc: (state, action) => {
      state.message = action.payload; 
    },
  }
});

export const { inquiryDesc } = inquiryMessage.actions;
export const InquiryReducer = inquiryMessage.reducer;