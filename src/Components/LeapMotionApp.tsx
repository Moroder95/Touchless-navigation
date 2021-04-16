import React, { useEffect } from 'react';
// import * as Leap from 'leapmotionts';
// import { LeapEvent } from 'leapmotionts';
import styles from '../styles.module.css';
import 'leapjs-plugins';
import * as Leap from 'leapjs';
export interface LeapMotionAppProps {}

const LeapMotionApp: React.SFC<LeapMotionAppProps> = () => {
  useEffect(() => {
    const controller = new Leap.Controller({ enableGestures: true });
    const cursor: any = document.getElementsByClassName(styles.cursor)[0];

    controller.use('screenPosition');

    controller.on('frame', function (frame: any) {
      const { hands } = frame;
      if (hands.length) {
        const hand = hands[0];
        cursor.style.left = hand.screenPosition()[0] - 250 + 'px';
        cursor.style.top = hand.screenPosition()[1] + 1000 + 'px';
      }

      console.log(frame);
    });

    controller.connect();

    return () => {
      controller.disconnect();
    };
  }, []);

  return (
    <div>
      <div className={styles.cursor + ' cursor'}></div>
    </div>
  );
};

export default LeapMotionApp;
