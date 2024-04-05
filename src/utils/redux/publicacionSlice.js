import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
  name: 'publicacion',
  initialState: {
    publicacionLista: [],
  },
  reducers: {
    addPublicacion: (state, action) => {
      const { id, title, description, date, visualizaciones } = action.payload;
      const existe = state.publicacionLista?.find(
        p => p.id === action.payload.id
      );
      if (!existe) {
        state.publicacionLista.push({
          id: id,
          title: title,
          description: description,
          date: date,
          visualizaciones: visualizaciones,
          img0: "/publicacion1.webp",
          img1: "/publicacion2.webp",
          img2: "/publicacion3.webp",
        });
      }
    },
  },
});

export const { addPublicacion } = publicacionSlice.actions;
export default publicacionSlice.reducer;
