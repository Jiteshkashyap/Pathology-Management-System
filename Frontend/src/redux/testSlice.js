import { createSlice } from "@reduxjs/toolkit";

const testSlice= createSlice({
    name:'tests',
    initialState:{
        tests:[],
        loading:false,
        error:null,
    },
    reducers:{
        setTests:(state,action)=>{
            state.tests = action.payload;
            state.loading = false;
            state.error=null
        },
        addTestState:(state , action)=>{
            state.tests.push(action.payload)
        },
        updateTestState: (state, action)=>{
            state.tests = state.tests.map((tes)=>
             tes._id === action.payload._id ?action.payload :tes
            )
        },
        deleteTestState:(state , action)=>{
            state.tests = state.tests.filter(
                (tes)=> tes._id !== action.payload
            );
        },

        setTestLoading:(state , action)=>{
            state.loading = action.payload
        },
        setTestError:(state , action)=>{
            state.error= action.payload;
            state.loading= false;
        }
    }
});

export const {
    setTests,
    setTestError,
    setTestLoading,
    addTestState,
    updateTestState,
    deleteTestState
} = testSlice.actions;

export default testSlice.reducer;