import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nombre: '',
  foto: '',
  isAdmin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {nombre, foto, isAdmin} = action.payload;
      state.nombre = nombre;
      state.foto = foto;
      state.isAdmin = isAdmin;
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;