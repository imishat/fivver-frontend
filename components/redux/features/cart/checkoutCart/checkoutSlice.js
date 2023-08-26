const { createSlice } = require("@reduxjs/toolkit")

const initialState={
checkoutProducts:[]
}
const checkOutSlice=createSlice({
    name:"checkout",
    initialState,
    reducers:{

        checkoutCart:(state,action)=>{
            state.checkoutProducts.push(action.payload)
        }
    },
})

export const {checkoutCart}=checkOutSlice.actions

export default checkOutSlice.reducer