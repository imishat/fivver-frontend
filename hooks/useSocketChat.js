// hooks/useSocketChat.js

import { updateState } from '@/components/redux/features/update/updateSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export const useSocketChat = () => {
  const [client, setClient] = useState(null);
  const [returnMessage,setReturnMessage] = useState({})

const dispatch = useDispatch()

  // update 
  const messageUpdate = useSelector(state=>state.update)


  useEffect(() => {
    
    const authorization =  `Bearer ${typeof window!=='undefined' && window.localStorage.getItem('accessToken')}`;


  const url = "ws://103.49.169.89:30912";
  const clientInstance = io(url, {
    path: "/realtime-messaging",
  });


    clientInstance.on('connect', () => {
      clientInstance.on('authorized', () => {
        console.log('connected to the server.');
        clientInstance.on('message', (msg) => {
          dispatch(updateState(!messageUpdate?.update))
          setReturnMessage(JSON.parse(msg));
        });
      });
      clientInstance.emit('authorization', authorization);
    });

    clientInstance.on('error', erroneousResponse => {
      console.error(JSON.parse(erroneousResponse));
    });

    clientInstance.on('disconnect', () => {
      clientInstance.off('authorized');
      clientInstance.off('message');
      console.log('disconnected from the server.');
    });

    setClient(clientInstance);

    // Clean up on component unmount
    return () => clientInstance.disconnect();
  }, []);

  const sendMessage = useCallback((content) => {
    if (client) {
    console.log(content)
      client.send(JSON.stringify(content));
    }
  }, [client]);


  return {
    sendMessage,
    returnMessage
  };
};
