import * as React from 'react';
import { UidContext } from '../Context/UidContext';
import { io, Socket } from 'socket.io-client';
import { host } from '../Settings/host';

export let socket: Socket | null = null;

export function connectToSocket() {
    const { uid } = React.useContext(UidContext);
    
    React.useEffect(() => {
        return () => {
            console.log('disconnect connect sokcet')
            socket?.disconnect()
        }
    }, [uid]);

    if (uid) {
        socket = io(host, {
            auth: {
                token: uid
            }
        });
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
