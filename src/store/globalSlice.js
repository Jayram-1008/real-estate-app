import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "null",
    name: "null",
    hiddenColumn: { type: "realEstate/setHiddenColumn", payload: {} }
};

export const globalSlice = createSlice({
    name: "realEstateApp",
    initialState,
    reducers: {
        setUserId: (state, userId) => {
            state.userId = userId;
        },
        setName: (state, name) => {
            state.name = name;
        },
        setHiddenColumn: (state, column) => {
            state.hiddenColumn = column;
        }
    },
});


export const { setUserId } = globalSlice.actions;
export const { setName } = globalSlice.actions;
export const { setHiddenColumn } = globalSlice.actions;

export default globalSlice.reducer;