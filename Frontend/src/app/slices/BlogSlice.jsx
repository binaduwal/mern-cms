import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blogslice",
  initialState,
  reducers: {
    blogsData: (state, action) => {
      // Ensure state.blogs is always an array
      if (!Array.isArray(state.blogs)) {
        state.blogs = [];
      }
      const newItem = action.payload;
      state.blogs.push(newItem);
  
    },

    removeBlogs: (state, action) => {
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },
    clearBlogs:(state,action)=>{
      state.blogs="";
    },

     
  }
});

export const { blogsData, removeBlogs,clearBlogs} =blogSlice.actions;
export const blogsReducer= blogSlice.reducer;