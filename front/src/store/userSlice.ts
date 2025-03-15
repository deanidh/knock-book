import { createSlice } from '@reduxjs/toolkit';
import { Archive } from '../types/Archive';

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  nickname: string | null;
  phone: string | null;
  archives: Archive[];
}

const savedUser = localStorage.getItem('user');
const initialState: UserState = savedUser
  ? JSON.parse(savedUser)
  : {
      isLoggedIn: false,
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
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
      state.phone = action.payload.phone;
      state.archives = action.payload.archives;

      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.nickname = null;
      state.phone = null;
      state.archives = [];

      localStorage.removeItem('user');
    },
    setArchives(state, action) {
      state.archives = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    addArchive(state, action) {
      state.archives.push(action.payload);
      localStorage.setItem('user', JSON.stringify(state));
    },
    removeArchive(state, action) {
      state.archives = state.archives.filter((archive) => archive.archiveId !== action.payload);
      localStorage.setItem('user', JSON.stringify(state));
    },
    updateArchive(state, action) {
      const index = state.archives.findIndex((archive) => archive.isbn === action.payload.isbn);
      if (index !== -1) {
        state.archives[index] = { ...state.archives[index], ...action.payload };
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { login, logout, addArchive, removeArchive, updateArchive, setArchives } = userSlice.actions;
export default userSlice;
