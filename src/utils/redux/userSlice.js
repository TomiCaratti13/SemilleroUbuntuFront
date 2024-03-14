import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nombre: '',
  foto: '',
  authorities: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {nombre, foto, authorities} = action.payload;
      state.nombre = nombre;
      state.foto = foto;
      state.authorities = authorities;
    }
  }
});

// const initialState = {
//   iat: '',
//   name: '',
//   sub: '',
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     addUser: (state, action) => {
//       const {iat, name, sub} = action.payload;
//       state.iat = iat;
//       state.name = name;
//       state.sub = sub;
//     }
//   }
// });

export const { addUser } = userSlice.actions;
export default userSlice.reducer;