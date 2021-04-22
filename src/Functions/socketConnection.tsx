import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import { UidContext } from '../Context/UidContext';
import { host } from '../Settings/host';

export let socket: Socket | null = null;

export function connectToSocket() {
    const { uid } = React.useContext(UidContext);
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
