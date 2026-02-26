import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = null;
    },

    addDoctorState: (state, action) => {
      state.doctors.push(action.payload);
    },

    updateDoctorState: (state, action) => {
  state.doctors = state.doctors.map((doc) =>
    doc._id === action.payload._id ? action.payload : doc
  );
},

    deleteDoctorState: (state, action) => {
      state.doctors = state.doctors.filter(
        (doc) => doc._id !== action.payload
      );
    },

    setDoctorLoading: (state, action) => {
      state.loading = action.payload;
    },

    setDoctorError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setDoctors,
  addDoctorState,
  updateDoctorState,
  deleteDoctorState,
  setDoctorLoading,
  setDoctorError,
} = doctorSlice.actions;

export default doctorSlice.reducer;