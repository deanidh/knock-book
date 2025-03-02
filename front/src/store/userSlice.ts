import { createSlice } from '@reduxjs/toolkit';
import { Archive } from '../types/Archive';

interface UserState {
  username: string | null;
  nickname: string | null;
  phone: string | null;
  archives: Archive[];
}

const initialState: UserState = {
  username: null,
  nickname: null,
  phone: null,
  archives: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
      state.phone = action.payload.phone;
      state.archives = action.payload.archives;
    },
    logout(state) {
      state.username = null;
      state.nickname = null;
      state.phone = null;
      state.archives = [];
    },
    addArchive(state, action) {
      state.archives.push(action.payload);
    },
    removeArchive(state, action) {
      state.archives = state.archives.filter((archive) => archive.archiveId !== action.payload);
    },
  },
});

export const { login, logout, addArchive, removeArchive } = userSlice.actions;
export default userSlice;
