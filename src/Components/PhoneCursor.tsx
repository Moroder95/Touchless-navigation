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

  // Setting constants used when calculating cursor movement
  const EXPONENT = 2;
  const MULTIPLIER_X = 0.13;
  const MULTIPLIER_Y = 0.1;
  const CURSOR_CENTER_OFFSET = 50;

  useEffect(() => {
    let socket: Socket | null = null;
    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
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
          const signX = deltaX > 0 ? 1 : -1;
          const signY = deltaY > 0 ? 1 : -1;

          // Translating the delta-input to move-output
          // Fast movements yield higher values for increased movability
          // Slow movements yield lower values for increased precision
          const moveX =
            Math.ceil(Math.pow(deltaX, EXPONENT) * MULTIPLIER_X) * signX;
          const moveY =
            Math.ceil(Math.pow(deltaY, EXPONENT) * MULTIPLIER_Y) * signY;

          // New cursor position is calculated
          let newX = cursorPos.x + moveX + CURSOR_CENTER_OFFSET;
          let newY = cursorPos.y + moveY + CURSOR_CENTER_OFFSET;

          // Movement along X-axis if new cursor position is within window frame
          if (deltaX !== 0 && newX < windowSize.width && newX > -1) {
            cursor.style.left = newX + 'px';
          }

          // Movement along Y-axis if new cursor position is within window frame
          if (deltaY !== 0 && newY < windowSize.height && newY > -1) {
            cursor.style.top = newY + 'px';
          }
        }
      );

      socket.on('key event', ({ key }: { key: string }) => {
        console.log('key event registered', key);
        // dispatch key event for
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
