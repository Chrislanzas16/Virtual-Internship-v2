import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfo = {uid: string; email: string | null} | null;

type AuthState = {user: UserInfo; loading: boolean};
const initialState: AuthState = { user: null, loading:false}

export const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {state.user = action.payload; state.loading = false;},
        startLoading: (state) => {state.loading = true},
        logoutLocal: (state) => {state.user = null; state.loading = false;},
    }
});

export const {setUser, startLoading,logoutLocal} = authSlice.actions;
export const selectIsAuthed = (state: {auth: AuthState}) => Boolean(state.auth.user);
export const selectAuthLoading = (state: { auth: AuthState}) => state.auth.loading;
export default authSlice.reducer