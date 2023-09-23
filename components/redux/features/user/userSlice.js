
const { createSlice } = require("@reduxjs/toolkit")

const initialState={
user:{}
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

        userData:(state,action)=>{
            state.user=action.payload
          
        }
    },
})

export const {userData}=userSlice.actions

export default userSlice.reducer