import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryLista: [],
  },
  reducers: {
    addCategory: (state, action) => {
      const { title, identifier, img, id } = action.payload;
      const existe = state.categoryLista.find(
        c => c.id === action.payload.id
      );
      if (existe) {
        state.categoryLista.push({
          id:id,
          title: title,
          identifier: identifier,
          img: img,
        });
      }
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
