import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
  name: 'publicacion',
  initialState: {
    lista: [],
  },
  reducers: {
    addPublicacion: (state, action) => {
      const { id , title , description , date , visualizaciones } = action.payload;
      state.lista.push({
        id: id,
        title: title,
        description: description,
        date: date,
        visualizaciones: visualizaciones,
      });
    },
  },
});

export const { addPublicacion } = publicacionSlice.actions;
export default publicacionSlice.reducer;
