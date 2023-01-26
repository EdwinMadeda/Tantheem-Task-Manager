import { createSlice, current } from "@reduxjs/toolkit";


const prevLocationSlice = createSlice({
    name : 'prevLocation',
    initialState : {
        prevLocation : '/', 
        storeLocation : '/',
        mode : '',
    },
    reducers : {
        setPrevLocation(state, action){
            state.storeLocation = state.prevLocation;
            state.prevLocation = action.payload;
        },
    }
});


export const getPrevLocation = state => state.prevLocation.prevLocation;
export const getStoreLocation = state => state.prevLocation.storeLocation;

export const { setPrevLocation } = prevLocationSlice.actions;
export default prevLocationSlice.reducer;