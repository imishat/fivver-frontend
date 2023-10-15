
const { createSlice } = require("@reduxjs/toolkit")

const initialState={
update:true
}
const updateSlice=createSlice({
    name:"update",
    initialState,
    reducers:{

        updateState:(state,action)=>{
            state.update=action.payload
          
        }
    },
})

export const {updateState}=updateSlice.actions

export default updateSlice.reducer