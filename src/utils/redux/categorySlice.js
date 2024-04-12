import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryLista: [],
  },
  reducers: {
    addCategory: (state, action) => {
      const { title, identifier, cantidad, img, description } = action.payload;
      const existe = state.categoryLista?.find(
        category => category.title === title
      );
      if (!existe) {
        state.categoryLista?.push({
          title: title,
          identifier: identifier,
          // cantidad: cantidad,
          img: img,
          // description: description,
        });
      }
    },
    clearCategory: state => {
      state.categoryLista = [];
    },
  },
});

export const { addCategory , clearCategory } = categorySlice.actions;
export default categorySlice.reducer;