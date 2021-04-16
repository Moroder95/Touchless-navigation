import React, { useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { host } from '../Settings/host';
import { UidContext } from '../Context/UidContext';
import styles from '../styles.module.css';

export interface PhoneCursorProps {
  children: React.ReactNode;
}

const PhoneCursor: React.FC<PhoneCursorProps> = ({ children }) => {
  const { uid, setConnection } = useContext(UidContext);
  const compressor = 0.1;

  useEffect(() => {
    let socket: Socket | null = null;
    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    console.log(windowSize);
    const cursor = document.getElementsByClassName(
      'cursor'
    )[0] as HTMLDivElement;
    cursor.style.left = '0px';
    cursor.style.top = '0px';

    if (uid) {
      socket = io(host, {
        auth: {
          token: uid
        }
      });

      socket.emit('initialize room');

      socket.on(
        'cursor move',
        ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
          const cursorPos = cursor.getBoundingClientRect();
          let newX = cursorPos.x + Math.ceil(deltaX * compressor) + 50;
          let newY = cursorPos.y + Math.ceil(deltaY * compressor) + 50;

          // Movement along X-axis
          if (deltaX !== 0 && newX < windowSize.width && newX > -1) {
            cursor.style.left = newX + 'px';
          }

          // Movement along Y-axis
          if (deltaY !== 0 && newY < windowSize.height && newY > -1) {
            cursor.style.top = newY + 'px';
          }
          // console.log('x', cursor.style.left, 'y', cursor.style.top);
        }
      );

      socket.on('key event', ({ key }: { key: string }) => {
        console.log('key event registered', key);
        // dispatch key events for
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: key, bubbles: true })
        );
      });

      socket.on('room size changed', ({ users }: any) => {
        if (users === 2) {
          setConnection(true);
        } else {
          setConnection(false);
        }
      });

      socket.on('disconnecting', () => {
        socket?.emit('host disconnected');
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [uid]);

  return (
    <div>
      <div className={styles.cursor + ' cursor'}></div>
      {children}
    </div>
  );
};

export default PhoneCursor;
