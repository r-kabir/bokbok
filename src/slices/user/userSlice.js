import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'reduxuser',
    initialState: {value: null, },
    reducers: { 
        reduxuserdata:(state, action)=>{
            state.value = action.payload;
        }, 
    },
})

export const {reduxuserdata} = userSlice.actions;

export default userSlice.reducer;