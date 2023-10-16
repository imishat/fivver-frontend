
const { createSlice } = require("@reduxjs/toolkit")

const initialState={
messages:[]
}
const allMessageSlice=createSlice({
    name:"messages",
    initialState,
    reducers:{

        messagesState:(state,action)=>{
            state.messages=action.payload
          
        }
    },
})

export const {messagesState}=allMessageSlice.actions

export default allMessageSlice.reducer