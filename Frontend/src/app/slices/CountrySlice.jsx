import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: null, 
};

export const countryData = createSlice({
  name: "countryslice",
  initialState,
  reducers: {
    countryInfo: (state, action) => {
      const countryDetails = action.payload;
      state.country = countryDetails; 
    },
  }
});

export const { countryInfo } = countryData.actions;
export const countryReducer = countryData.reducer;