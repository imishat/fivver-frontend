// import { io } from 'socket.io-client';

// const url = 'ws://103.49.169.89:30912';
// const authorization = 'Bearer ...';

// export const client = io(url, {
//     path: '/realtime-messaging',
// });

// export function initializeSocket(onMessageReceivedAsync) {
//     client.on('connect', () => {
//         client.on('authorized', () => {
//             client.on('message', onMessageReceivedAsync);
//             client.emit('authorization', authorization);
//         });
//         client.emit('authorization', authorization);
//     });

//     client.on('error', erroneousResponse => {
//         const error = JSON.parse(erroneousResponse);
//         console.error(error);
//     });

//     client.on('disconnect', () => {
//         client.off('authorized');
//         client.off('message', onMessageReceivedAsync);
//         console.log('disconnected from the server.');
//     });
// }

// export function send(data) {
//     client.send(JSON.stringify(data));
// }
