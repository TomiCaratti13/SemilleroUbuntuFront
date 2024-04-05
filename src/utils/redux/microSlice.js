import { createSlice } from '@reduxjs/toolkit';

export const microSlice = createSlice({
  name: 'microemprendimiento',
  initialState: {
    microLista: [],
  },
  reducers: {
    addMicro: (state, action) => {
      const { id, title, description, moreinfo, img2, img1, img0, category, subcategory, ubication } = action.payload;
      const existe = state.Microlista.find(p => p.id === action.payload.id);
      if (!existe) {
        state.Microlista.push({
          title: title,
        category: category,
        subcategory: subcategory,
        ubication: ubication,
        img0: img0,
        img1: img1,
        img2: img2,
        description: description,
        moreinfo: moreinfo,
        id: id,
        });
      }
    },
  },
});

export const { addMicro } = microSlice.actions;
export default microSlice.reducer;