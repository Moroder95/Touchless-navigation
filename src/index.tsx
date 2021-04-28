export { default as TouchlessApp } from './Components/TouchlessApp';
export { default as Touchless } from './Components/Touchless';
export { default as MobileQR } from './Components/MobileQR';
import { useContext } from 'react';
import * as socketConnection from './Functions/socketConnection';
import { UidContext } from './Context/UidContext';
import {/* CustomKeysContext,*/ CustomKeysType } from './Context/CustomKeysContext';
import { io, Socket } from 'socket.io-client';
import { host } from './Settings/host';

export { CustomKeysType };
export type InteractionType =
| 'phoneHighlight'
| 'phoneCursor'
| 'leapMotion'
| 'leapMotionPinch';

export function useConnectionChange() {
    const { connection } = useContext(UidContext);
    return connection;
}

export function useGoToStartElement() {
    const { setNext } = useContext(UidContext);
    return () => setNext((prevNext) => prevNext + 1);
}

const isEqual = (obj1: object, obj2: object) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (let objKey of obj1Keys) {
        if (obj1[objKey] !== obj2[objKey]) {
            if (
                typeof obj1[objKey] == 'object' &&
                typeof obj2[objKey] == 'object'
            ) {
                if (!isEqual(obj1[objKey], obj2[objKey])) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    return true;
};
export function useCustomKeys(customKeysObject: CustomKeysType) {
    
    const { uid } = useContext(UidContext);


    function initiate() {
        // let socket = socketConnection.connectToSocket();
        if (
            Object.entries(customKeysObject).length > 0 
        ) {
            const socket: Socket | null = uid ? io(host, {
                auth: {
                    token: uid
                }
            }) : null;
            socket?.on('connect', ()=>{
                console.log('init in connect', socket?.connected)
                socket?.emit('set custom keys', customKeysObject);
                // socket.disconnect();
            });
            socket?.on('disconnect', ()=>{
                console.log('init in disconnect', socket?.id)
            })
        }
    }
    function clear(){
        // let socket = socketConnection.connectToSocket();
        const socket: Socket | null = uid ? io(host, {
            auth: {
                token: uid
            }
        }) : null;

        socket?.on('connect', ()=>{
            console.log('clear', socket?.connected)
            socket?.emit('set custom keys', {});
            // socket.disconnect();
        })
        socket?.on('disconnect', ()=>{
            console.log('clear in disconnect', socket?.id)
        })
        
    }
    return {initiate, clear};
}
export function useNewSession() {
    const { newUid } = useContext(UidContext);

    return () => {
        newUid();
    }
}

export function useRedirectPhone() {
    return (href: string) => {
        socketConnection.emit('redirect phone', href);
    };
}

export function usePhoneUI(html: string) {
    return () => socketConnection.emit('update phone UI', html);
}
