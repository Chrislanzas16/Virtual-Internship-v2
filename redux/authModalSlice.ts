import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Mode = "login" | "signup" | "forgot";

export interface AuthModalState {
  isOpen: boolean;
  mode: Mode;
  error: string | null;
}

const initialState: AuthModalState = {
  isOpen: false,
  mode: "login",
  error: null,
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Mode | undefined>) => {
      state.isOpen = true;
      state.mode = action.payload ?? "login";
      state.error = null;
    },
    close: (state) => {
      state.isOpen = false;
      state.mode = "login";
      state.error = null;
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { open, close, setMode, setError } = authModalSlice.actions;

export default authModalSlice.reducer;
