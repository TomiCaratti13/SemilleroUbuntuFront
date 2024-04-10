import { createSlice } from '@reduxjs/toolkit';

export const microSlice = createSlice({
  name: 'microemprendimiento',
  initialState: {
    microLista: [],
  },
  reducers: {
    addMicro: (state, action) => {
      const { id, title, description, moreinfo, category, identifier, subcategory, ubication, } = action.payload;
      const existe = state.microLista.find(p => p.id === action.payload.id);
      if (!existe) {
        state.microLista.push({
          id: id,
          title: title,
          description: description,
          moreinfo: moreinfo,
          category: category,
          identifier: identifier,
          subcategory: subcategory,
          ubication: ubication,
        });
      }
    },
  },
});

export const { addMicro } = microSlice.actions;
export default microSlice.reducer;