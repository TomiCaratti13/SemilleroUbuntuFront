import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    Categorylista: [],
  },
  reducers: {
    addCategory: (state, action) => {
      const { title, identifier, cantidad, img, description } = action.payload;
      state.lista.push({
        title: title,
        identifier: identifier,
        // cantidad: cantidad,
        img: img,
        // description: description,
      });
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;

// reducers: {
//   addCategory: (state, action) => {
//     const { title, identifier, img, cantidad, description } = action.payload;
//     const existe = state.categoryLista.find(
//       c => c. === action.payload.identifier
//     );
//     if (existe) {
//       state.categoryLista.push({
//         title: title,
//         identifier: identifier,
//         cantidad: cantidad,
//         img: img,
//         description: description,
//       });
//     }
//   },
// },