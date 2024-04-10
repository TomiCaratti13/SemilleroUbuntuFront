import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
  name: 'publicacion',
  initialState: {
    publicacionLista: [],
  },
  reducers: {
    addPublicacion: (state, action) => {
      const { id, title, description, date, visualizaciones } = action.payload;
      const existe = state.publicacionLista?.find(p => p.id === action.payload.id);
      if (!existe) {
        state.publicacionLista.push({
          id: id,
          title: title,
          description: description,
          date: date,
          visualizaciones: visualizaciones,
        });
      }
    },
    clearPublicaciones: state => {
      state.publicacionLista = [];
    },
  },
});

export const { addPublicacion, clearPublicaciones } = publicacionSlice.actions;
export default publicacionSlice.reducer;
