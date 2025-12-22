import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isEmailVerified?: boolean;
  isLoginDialogOpen?: boolean;
  isLoggedIn?: boolean;
}

const initialState: UserState = {
  user: null,
  isEmailVerified: false,
  isLoginDialogOpen: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isEmailVerified = false;
      state.isLoggedIn = false;
    },
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    authStatus: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const {
  setUser,
  setIsEmailVerified,
  logout,
  toggleLoginDialog,
  authStatus,
} = userSlice.actions;

export default userSlice.reducer;
