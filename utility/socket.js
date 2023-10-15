import { io } from 'socket.io-client';

const url = 'ws://103.49.169.89:30912';
const authorization = `Bearer ${typeof window!=='undefined' && window.localStorage.getItem('accessToken')}`;

export const client = io(url, {
    path: '/realtime-messaging',
});


export async function initializeSocket(onMessage) {
    client.on('connect', () => {
        client.on('authorized', () => {
            client.on('message', onMessage);
            client.emit('authorization', authorization);
        });
        client.emit('authorization', authorization);
     
    });

    client.on('error', erroneousResponse => {
        const error = JSON.parse(erroneousResponse);
        console.error('error');
    });

    client.on('disconnect', () => {
        client.off('authorized');
        client.off('message', onMessage);
        console.log('disconnected from the server.');
    });
}

export async function send(data) {
    console.log(data)
    client.send(JSON.stringify(data));
}
