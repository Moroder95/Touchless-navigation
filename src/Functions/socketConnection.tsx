import * as React from 'react';
import { UidContext } from '../Context/UidContext';
import { io, Socket } from 'socket.io-client';
import { host } from '../Settings/host';

export let socket: Socket | null = null;

export function connectToSocket() {
    const { uid } = React.useContext(UidContext);
    const socketRef  = React.useRef<Socket | null>(null);
    React.useEffect(() => {
        return () => {
            console.log('disconnect connect socket');
            socket?.disconnect();
        }
    }, [uid]);
  
    if (uid) {
        socket = io(host, {
            auth: {
                token: uid
            }
        });
        socketRef.current = socket;
    }
    return socket;
}

export const emit = (identifier: string, data: string) => {
    socket?.emit(identifier, { data: data });
};

export function useSocket(){
    const { uid } = React.useContext(UidContext);

    const socket = uid ? io(host, {
        auth: {
            token: uid
        }
    }) : null;
    return socket;
}
