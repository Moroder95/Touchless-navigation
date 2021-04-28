import React from 'react'
import {
    TouchlessApp
} from 'touchless-navigation';
import App from './App';

export interface MyTouchlessAppProps {
    
}
export type InteractionType =
| 'phoneHighlight'
| 'phoneCursor'
| 'leapMotion'
| 'leapMotionPinch';
export const interactionTypes: readonly InteractionType[] = Object.freeze([
'phoneHighlight',
'phoneCursor',
'leapMotion',
'leapMotionPinch',
]);

const MyTouchlessApp: React.SFC<MyTouchlessAppProps> = () => {
    const [interactionTypeIndex, setInteractionTypeIndex] = React.useState(0);
    const nextInteractionType = () => {
        const maxIndex = interactionTypes.length - 1;
        const i =
            interactionTypeIndex >= maxIndex ? 0 : interactionTypeIndex + 1;
        setInteractionTypeIndex(i);
    };
    const interactionType = interactionTypes[interactionTypeIndex];
    return ( 
        <TouchlessApp interactionType={interactionType}>
            <button onClick={nextInteractionType}>next interactiontyoe</button>
            <App/>
        </TouchlessApp>
     );
}
 
export default MyTouchlessApp;