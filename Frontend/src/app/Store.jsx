import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { countryReducer } from "./slices/CountrySlice";
import { paginationReducer } from "./slices/PaginationSlice";
import { signUpReducer } from "./slices/SignupSlice";
import { blogsReducer } from "./slices/BlogSlice";
import { InquiryReducer } from "./slices/InquirySlice";
import { userRoleReducer } from "./slices/RoleSlice";
import { permissionReducer } from "./slices/PermissionSlice";
import { addRoleReducer } from "./slices/AddRoleSlice";
import apiSlice from "./services/ApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  countryslice:countryReducer,
  pagyslice:paginationReducer,
  signupslice:signUpReducer,
  blogslice:blogsReducer,
  inquiryslice:InquiryReducer,
  roleslice:userRoleReducer,
  permissionslice:permissionReducer,
  addroleslice:addRoleReducer,
  [apiSlice.reducerPath]:apiSlice.reducer,
  
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
  getDefaultMiddleware({
    serializableCheck: false, 
  }).concat(apiSlice.middleware),
 
});
setupListeners(store.dispatch);