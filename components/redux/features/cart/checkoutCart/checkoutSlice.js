const { createSlice } = require("@reduxjs/toolkit")

const initialState={
products:[]
}
const checkOutSlice=createSlice({
    name:"checkout",
    initialState,
    reducers:{

        checkoutCart:(state,action)=>{
            state.products.push(action.payload)
        }
    },
})

export const {checkoutCart}=checkOutSlice.actions

export default checkOutSlice.reducer