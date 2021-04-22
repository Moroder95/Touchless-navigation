import * as React from 'react';
import styles from '../styles.module.css';
// import { io, Socket } from 'socket.io-client';
// import { host } from '../Settings/host';
import { UidContext } from '../Context/UidContext';
import { useEffect } from 'react';
import * as socketConnection from '../Functions/socketConnection';

export interface TouchlessAppProps {
    children: React.ReactNode;
    secondaryThreshold?: number;
}
interface coordinateObj {
    x: number;
    y: number;
    pos?: DOMRect | null;
}
const ACTIVESTYLE = [styles.active, 'active'];

const removeActive = (element: any) => {
    element.classList.remove(...ACTIVESTYLE);
};
const addActive = (element: any) => {
    element.classList.add(...ACTIVESTYLE);
};

const customKeyGesture = (key: string) => {
    if (key === 'Enter') {
        return 'click';
    } else {
        return 'swipe'.concat(key.substr(5));
    }
};

const getCenterPos = (element: HTMLDivElement | null): coordinateObj => {
    // Function that gives X and Y coordinates on an HTMLDivElement  and the getBoundingClientRect object
    const pos = element?.getBoundingClientRect() || null;
    const { width: appWidth, height: appHeight } = document
        .querySelector('.touchless-app.' + styles['touchless-app'])
        ?.getBoundingClientRect() || { width: 0, height: 0 };

    const y: number = pos?.y || 0;
    const x: number = pos?.x || 0;

    return { x: (x / appWidth) * 100, y: (y / appHeight) * 100, pos };
};

const TouchlessApp: React.SFC<TouchlessAppProps> = ({
    children,
    secondaryThreshold = 1
}) => {
    const { uid, setConnection, next, customKeys } = React.useContext(
        UidContext
    );

    React.useEffect(() => {
        // runs if next state is update in context, to reset the controlled element
        const elements = document.querySelectorAll('.' + styles.touchless); // Get all elements that can be controlled
        const controlled = document.querySelectorAll(
            '.' + styles.touchless + '.' + styles.active
        ); // Get currently controlled Element
        const startElement = document.querySelector(
            '.' + styles.touchless + '.start-element'
        ); // Get Element with starting class

        if (elements.length > 0) {
            //If there are elements to control
            if (controlled.length) {
                // If there is any element that currently in control
                controlled.forEach((el) => {
                    //Go through them all and remove the controlled class
                    removeActive(el);
                });
            }
            if (startElement) {
                //If there is a element that is set to be the starting element
                addActive(startElement);
            } else {
                //Add classname so that it's controlled
                addActive(elements[0]);
            }
        }
    }, [next]);

    React.useEffect(() => {
        const keyEvent = (e: KeyboardEvent) => {
            // Get the currently selected Element from the DOM
            const controlledElement: HTMLDivElement | null = document.querySelector(
                '.' + styles.touchless + '.' + styles.active
            );
            const elements = document.querySelectorAll('.' + styles.touchless); // Get all elements that can be controlled

            //If keypress is not = Arrow keys or Enter, return and dont execute any code
            if (
                ![
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowRight',
                    'ArrowLeft',
                    'Enter'
                ].includes(e.key)
            ) {
                return;
            } else if ('Enter' === e.key) {
                //If enter click the selected Element and return
                controlledElement?.click();
                return;
            }

            let closest: HTMLDivElement | null = null; // Variable for storing the closest DOM element in the direction wanted
            const xy =
                e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? 'x' : 'y'; // If left or Right Arrow  - Primary axis is set to X, else it is set to Y
            const xy2 = xy === 'x' ? 'y' : 'x'; //Secondary axis, the opposite of primary axis
            const direction =
                e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1; // Direction variable is a multiplier to ensure positive values when an Elements position is in the right direction in relation to the starting point
            const sThreshold = secondaryThreshold; //Threshold is how far of an element is allowed to be positioned in the secondary direction in relation to the starting point
            let loops = 1; // Variable to keep count of loops made and used for multiplying the threshold, to gradually find closest element in relation to the secodnary axis.
            const maxLoops = 15; // Variable to stop if loops variable exceeds this number

            // Function the alters the variable called Closest, it calls itself no more than the times maxLoops contains.
            const findClosestElement = (thresMultplier: number) => {
                //Goes through the list of all the elements that can potentially be selected
                elements.forEach((el) => {
                    //closest is null and the element that is controlled is not the current element then. This only executes when no closest element has been set.
                    if (
                        closest === null &&
                        el !== controlledElement &&
                        el &&
                        controlledElement
                    ) {
                        const controlled = getCenterPos(controlledElement); //get x, y coordinates of the controlled element
                        const check = getCenterPos(el as HTMLDivElement); //get x, y coordinates of the current element in the nodeList

                        // newDifference stores the difference in position on PRIMARY axis between the current Element in the nodeList and the controlled Elements.
                        // It is muliplied by direction to get positive values if it's the direction the arrowKey is pointing at
                        const newDifference =
                            (check[xy] - controlled[xy]) * direction;
                        //newDifferenceSecondary stores the difference in position on SECONDARY axis between the current Element in the nodeList and the controlled Elements.
                        //The value is absolute as it can be to either side of the controlled Element
                        const newDifferenceSecondary = Math.abs(
                            check[xy2] - controlled[xy2]
                        );

                        //If the newDifference is above 0, it's in the right direction AND the difference on the secondary axis is below the threshold
                        //set the current element in the nodelist as the closest for now.
                        if (
                            newDifference > 0 &&
                            newDifferenceSecondary < sThreshold * thresMultplier
                        ) {
                            closest = el as HTMLDivElement;
                        }
                    } else if (
                        closest &&
                        controlledElement &&
                        (el as HTMLDivElement) &&
                        el !== controlledElement
                    ) {
                        const controlled = getCenterPos(controlledElement); //get x, y coordinates of the controlled element
                        const check = getCenterPos(el as HTMLDivElement); //get x, y coordinates of the current element in the nodeList
                        const close = getCenterPos(closest); //get x, y coordinates of the currently closest element in the nodeList

                        // closestDifference and newDifference stores the difference in position on PRIMARY axis between the currently closest and current Element in the nodeList and the controlled Elements.
                        // It is muliplied by direction to get positive values if it's the direction the arrowKey is pointing at
                        const closestDifference =
                            (close[xy] - controlled[xy]) * direction;
                        const newDifference =
                            (check[xy] - controlled[xy]) * direction;

                        //newDifferenceSecondary and newDifferenceSecondary stores the difference in position on SECONDARY axis between the currently closest and current Element in the nodeList and the controlled Elements.
                        //The value is absolute as it can be to either side of the controlled Element
                        const closestDifferenceSecondary = Math.abs(
                            close[xy2] - controlled[xy2]
                        );
                        const newDifferenceSecondary = Math.abs(
                            check[xy2] - controlled[xy2]
                        );

                        if (
                            newDifference > 0 &&
                            newDifferenceSecondary <=
                                closestDifferenceSecondary &&
                            newDifference <= closestDifference &&
                            newDifferenceSecondary < sThreshold * thresMultplier
                        ) {
                            closest = el as HTMLDivElement;
                        }
                    }
                });
                loops++; // loop counts up
                if (closest === null && loops < maxLoops) {
                    // closest is still not found and loops hasn't exceeded max, try find a closest element with a larger threshold multiplier
                    findClosestElement(loops * 0.5);
                }
            };
            //Execute function with starting multipler as 1
            findClosestElement(0.5);

            if (closest && controlledElement) {
                //remove and add classname on controlled and new controlled element
                addActive(closest as HTMLDivElement);
                removeActive(controlledElement);
            }
        };

        document.addEventListener('keydown', keyEvent); // bind eventlistener

        return () => {
            document.removeEventListener('keydown', keyEvent); // remove eventlistener is unmount
        };
    }, [secondaryThreshold]);

    let socket = socketConnection.connectToSocket();

    useEffect(() => {
        // let socket: Socket | null = null;

        if (socket) {
            // if uid is made, establish socket.io connection
            // socket = io(host, {
            //     auth: {
            //         token: uid
            //     }
            // });

            socket.emit('initialize room');
            socket.on('key event', ({ key }: { key: string }) => {
                // dispatch key events for
                if (Object.keys(customKeys).length > 0) {
                    const customGestureValue = customKeyGesture(key);
                    const customKey = customKeys.hasOwnProperty(
                        customGestureValue
                    )
                        ? customKeys[customGestureValue]
                        : key;
                    document.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: customKey,
                            bubbles: true
                        })
                    );
                } else {
                    document.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: key,
                            bubbles: true
                        })
                    );
                }
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
    }, [uid, customKeys]);

    return (
        <div className={`${styles['touchless-app']} touchless-app`}>
            {children}
        </div>
    );
};

export default TouchlessApp;
