import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getCookies, setUpCookies } from "../Cookies/Cookies";

const cookies = getCookies();
const clearArray = cookies["rows"] || cookies[" rows"] || []
const rowsSlice = createSlice({
    name: 'rows',
    initialState: { value: clearArray },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
            setUpCookies('rows', action.payload);
        },
    }
});

const switchSlice = createSlice({
    name: 'switch',
    initialState: { value: cookies["switch"] || cookies[" switch"] || false },
    reducers: {
        actionSwitch: (state, action) => {
            state.value = action.payload;
            setUpCookies('switch', action.payload);
        }
    }
})

export const { set } = rowsSlice.actions;
export const { actionSwitch } = switchSlice.actions;

export const store = configureStore({
    reducer: {
        rows: rowsSlice.reducer,
        switch: switchSlice.reducer,
    },
});