import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  nombre: '',
  foto: '',
  isAdmin: false,
  isInversor: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, nombre, foto, isAdmin, isInversor } = action.payload;
      state.id = id;
      state.nombre = nombre;
      state.foto = foto;
      state.isAdmin = isAdmin;
      state.isInversor = isInversor;
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;