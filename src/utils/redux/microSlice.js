import { createSlice } from '@reduxjs/toolkit';

export const microSlice = createSlice({
  name: 'microemprendimiento',
  initialState: {
    microLista: [],
  },
  reducers: {
    addMicro: (state, action) => {
      const { id, nombre, descripcion, masInformacion, rubro, subRubro, ubication, } = action.payload;
      const existe = state.microLista.find(p => p.id === action.payload.id);
      if (!existe) {
        state.microLista.push({
          id: id,
          title: nombre,
          description: descripcion,
          moreinfo: masInformacion,
          category: rubro,
          subcategory: subRubro,
          ubication: ubication,
        });
      }
    },
  },
});

export const { addMicro } = microSlice.actions;
export default microSlice.reducer;