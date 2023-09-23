import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  removed: false
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exsting = state.products.find(
        (product) => product.designId === action.payload.designId
      );
      if (exsting) {
        exsting.quantity += 1;
        exsting.isAdded = true;
        // Set isAdded to true for exsting products

        // state.isAdded=!state.isAdded
      } else {
        const newProduct = { ...action.payload, quantity: 1, isAdded: true };
        state.products.push(newProduct);

        localStorage.setItem("selected", JSON.stringify(state.products));
      }
    },
    removeFromCart: (state, action) => {
      
      const existing = state.products.find(
        (product) => product.designId === action.payload.designId
      );

      if (existing && existing.quantity >= 1) {
        existing.quantity = existing.quantity - 1;
      } else {
        state.products = state.products.filter(
          (product) => product.designId !== action.payload.designId
        );
      }
      // local storage filter for remove from cart

      // get data from local storage
      const localDesing =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("selected"));
       
      // find data with action payload
      const localExisting = localDesing.find(
        (product) => product.designId === action.payload.designId
      );
      //  remove data from localstorage
      if (localExisting) {
        state.removed=!state.removed;
        localStorage.setItem("selected",
          JSON.stringify(
            localDesing.filter(
              (design) => design.designId !== action.payload.designId
            )
          )
        );
        
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
