import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    Data: null
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers:{
        getTemplates: (state, action) => {
            state.status = true;
            state.Data = action.payload.Data;
        },
        clearTemplates: (state) => {
            state.status = false;
            state.Data = null;
        }
    }
})

export const {getTemplates, clearTemplates} = authSlice.actions;

export const selectData = (state) => state.template.Data;

export default templateSlice.reducer;