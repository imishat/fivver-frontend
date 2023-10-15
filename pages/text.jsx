
// components/ChatComponent.js

import { useState } from 'react';
import { useSocketChat } from '../hooks/useSocketChat';

const ChatComponent = () => {
  const { sendMessage,returnMessage } = useSocketChat();
const [message,setMessage] = useState('')
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        
    <div>
    <h2>{returnMessage?.content}</h2>
    <input className='input input-bordered'
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setMessage({
          type: "file",
          projectId: '',
          content: e.target.value,
          reply: {},
          files: [],
          userId: '',
          receiverId: '',
          userName: '',
        })}
      />
      <button className='btn btn-success' onClick={() => sendMessage(message)}>Send</button>
    </div>
    </div>
  );
};

export default ChatComponent;
