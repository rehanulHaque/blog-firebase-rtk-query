import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUserData: (state) => {
            state.user = null;
        },
    },
});



export const { setUser, clearUserData } = userSlice.actions;
export default userSlice.reducer;