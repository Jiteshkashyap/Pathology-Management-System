import { createSlice } from "@reduxjs/toolkit";

const packageSlice= createSlice({
    name:'packages',
    initialState:{
        packages:[],
        loading:false,
        error:null,
    },
    reducers:{
        setPackages:(state,action)=>{
            state.packages = action.payload;
            state.loading = false;
            state.error=null
        },
        addPackageState:(state , action)=>{
            state.packages.push(action.payload)
        },
        updatePackageState: (state, action)=>{
            state.packages = state.packages.map((tes)=>
             tes._id === action.payload._id ?action.payload :tes
            )
        },
        deletepackageState:(state , action)=>{
            state.packages = state.packages.filter(
                (tes)=> tes._id !== action.payload
            );
        },

        setPackageLoading:(state , action)=>{
            state.loading = action.payload
        },
        setPackageError:(state , action)=>{
            state.error= action.payload;
            state.loading= false;
        }
    }
});

export const {
    setPackages,
    updatePackageState,
    deletepackageState,
    addPackageState,
    setPackageError,
    setPackageLoading

} = packageSlice.actions;

export default packageSlice.reducer;