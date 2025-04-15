import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice=createSlice({
    name:'pagyslice',
    initialState:{
        datas:[],
        datasPerPage:6,
        currentPage:1,
    },

    reducers:{
        onNavigateNext:(state)=>{
            state.currentPage++;
        },
        onNavigatePrev:(state)=>{
            state.currentPage--;
        },
        onClickCurrentPage:(state,action)=>{
            state.currentPage=action.payload;
        },
        onChangeDataPerpage:(state,action)=>{
            state.datasPerPage=action.payload;
        },
        
    }
})

export const {onClickCurrentPage,onNavigateNext,onNavigatePrev,onChangeDataPerpage}=PaginationSlice.actions;
export const paginationReducer=PaginationSlice.reducer;