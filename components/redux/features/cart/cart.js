
import { createSlice } from '@reduxjs/toolkit';


const initialState
 = {
    products:[],
  };
  const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const exsting=state.products.find((product)=>product.designId===action.payload.designId)
            if (exsting) {
              exsting.quantity += 1;
            exsting.isAdded = true; 
              // Set isAdded to true for exsting products
            
              // state.isAdded=!state.isAdded
            } else {
              const newProduct = { ...action.payload, quantity: 1,  isAdded:true};
              state.products.push(newProduct);

             localStorage.setItem('selected',JSON.stringify(state.products))
              
             
            }                                                                                   
    },
    removeFromCart: (state, action) => {
        state.products = state.products.filter(
          (product) => product.designId !== action.payload.designId
        );
           localStorage.setItem('selected',JSON.stringify(state.products.filter(design=> design.designId!==action.payload.designId )))
        console.log(action)
      },
 

}
  })


export const {addToCart,removeFromCart}=cartSlice.actions
  export default cartSlice.reducer