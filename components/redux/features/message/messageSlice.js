
const { createSlice } = require("@reduxjs/toolkit")

const initialState={
message:{}
}
const messageSlice=createSlice({
    name:"message",
    initialState,
    reducers:{

        messageData:(state,action)=>{
            state.message=action.payload
          
        },
        deleteCOmment:(state,action)=>{
            state.message=  state.message.comments.filter(message=>message.messageId!==action.payload)
        }
    },
})

export const {messageData,deleteCOmment}=messageSlice.actions

export default messageSlice.reducer