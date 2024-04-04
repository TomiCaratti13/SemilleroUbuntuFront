import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    Categorylista: [],
  },
  reducers: {
    addCategory: (state, action) => {
      // const { title,  cantidad, img, description } = action.payload;
      const { id, title, identifier, img } = action.payload;
      const existe = state.Categorylista.find(p => p.id === action.payload.id);
      if (!existe) {
        state.Categorylista.push({
          id: id,
          title: title,
          identifier: identifier,
          // cantidad: cantidad,
          img: img,
          // description: description,
        });
      }
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