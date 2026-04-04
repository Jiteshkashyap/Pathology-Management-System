import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",

  initialState: {
  slots: [],
  appointments: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1
},

  reducers: {

    setSlots: (state, action) => {
      state.slots = action.payload;
      state.loading = false;
      state.error = null;
    },

    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.loading = false;
    },

    addAppointmentState: (state, action) => {
      state.appointments.unshift(action.payload);
    },

    cancelAppointmentState: (state, action) => {
  const index = state.appointments.findIndex(
    (appt) => appt._id === action.payload._id
  );

  if (index !== -1) {
    state.appointments[index] = action.payload;
  }
},

    setAppointmentLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAppointmentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // add new reducers

setAdminAppointments: (state, action) => {
  state.appointments = action.payload;
  state.loading = false;
},

setPagination: (state, action) => {
  state.page = action.payload.page;
  state.totalPages = action.payload.totalPages;
},
  }
});

export const {
  setSlots,
  setAppointments,
  addAppointmentState,
  cancelAppointmentState,
  setAppointmentLoading,
  setAppointmentError,
  setAdminAppointments,
  setPagination
} = appointmentSlice.actions;

export default appointmentSlice.reducer;