import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  prefil: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {name, perfil} = action.payload;
      state.name = name;
      state.perfil = perfil;
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;