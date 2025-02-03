import { createSlice } from '@reduxjs/toolkit';

type State = {
  isLogin: boolean;
};

const initialState: State = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: State) {
      state.isLogin = true;
    },
    logout(state: State) {
      state.isLogin = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
