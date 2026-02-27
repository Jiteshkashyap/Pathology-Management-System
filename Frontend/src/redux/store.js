import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import doctorReducer from './doctorSlice';
import testReducer from './testSlice'
import packageReducer from './packageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    tests:testReducer,
    packages:packageReducer
  },
});