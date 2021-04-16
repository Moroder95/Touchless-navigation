import * as React from 'react';
import UidContextProvider from '../Context/UidContext';
import LeapMotionApp from './LeapMotionApp';
import TouchlessApp from './TouchlessApp';
import PhoneCursor from './PhoneCursor';

export interface TouchlessAppWrapperProps {
  children: React.ReactNode;
  secondaryThreshold?: number;
  leapMotion?: boolean;
  phoneHighlightController?: boolean;
  phoneCursorController?: boolean;
}

const TouchlessAppWrapper: React.SFC<TouchlessAppWrapperProps> = ({
  children,
  secondaryThreshold,
  leapMotion = false,
  phoneHighlightController = false,
  phoneCursorController = false
}) => (
  <UidContextProvider>
    {phoneHighlightController && (
      <TouchlessApp secondaryThreshold={secondaryThreshold}>
        {children}
      </TouchlessApp>
    )}
    {phoneCursorController && <PhoneCursor>{children}</PhoneCursor>}
    {leapMotion && <LeapMotionApp>{children}</LeapMotionApp>}
  </UidContextProvider>
);

export default TouchlessAppWrapper;
