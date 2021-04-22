# React Touchless Navigation

>

[![NPM](https://img.shields.io/npm/v/touchless-navigation.svg)](https://www.npmjs.com/package/touchless-navigation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

-   [1. Description](#1-description)
-   [2. About](#2-about)
-   [3. Install](#3-install)
-   [4. Components](#4-components)
    -   [\<TouchlessApp />](#-<touchlessapp/>)
    -   [\<Touchless />](#-<touchless/>)
    -   [\<MobileQR />](#-<mobileqr/>)
-   [5. Hooks](#5-hooks)
-   [6. Usage](#6-usage)
-   [7. Examples](#7-examples)
    -   [Example of all components and hooks in a document](#-example-of-all-components-and-hooks-in-a-document)
    -   [Custom Component - checkbox](#-custom-component---checkbox)
    -   [CSS Example](#-css-example)

---

## 1. Description

A component library that can be used to enhance your React App, so that it can controlled without using touch.

## 2. About

As a part of Master Thesis in Interaction Design at AAU, we have created a small component library for React.  
The aim of the library is to enable developers to create React Apps that can be controlled without the need of touch at the display. Currently the library only supports interactions through users' personal phone by scanning a QR code that will give them control over the app. The library can be used to create the application that runs on public displays, thereby allowing users to interact with these displays without having to touch them directly.

## 3. Install

```bash
npm i touchless-navigation
```

## 4. Components

A list of the available components

### \<TouchlessApp />

The \<TouchlessApp> tag is what is the the controller, this is the parent component that manages all the \<Touchless> children components. In order to use all of the libraries functionality, everything has to be a child of this.
\<TouchlessApp> can receive the following props.

| Prop Name          | Required | Type      | Default value | Description                                                                                                                                                                                                                                                                                                |
| ------------------ | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secondaryThreshold | No       | number    | 1             | This value is an indicator of how far off an Element can be on the second Axis. E.g. You want to go right, there by trying to move on the x-axis, then the secondary axis is the y-axis. The prop then indicates how far on the y-axis the elements can be from each other and still be navigated between. |
| Children           | Yes      | ReactNode | null          | Everything the \<TouchlessApp> tag surrounds. This is where you insert your \<Touchless> components.                                                                                                                                                                                                       |

### \<Touchless />

The \<Touchless> tag is what wraps the element you wish to control. It has to be a child of the \<TouchlessApp> tag. It can receive the following props.

| Prop Name    | Required | Type          | Default value | Description                                                                                                                                 |
| ------------ | :------: | ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| startElement |    No    | boolean       | false         | If set to true, navigation will start from this element                                                                                     |
| onClick      |    No    | event => void | undefined     | Normal onClick function, that is called when hightlighted element is clicked                                                                |
| className    |    No    | string        | undefined     | Your own classnames for styling                                                                                                             |
| style        |    No    | CSSProperties | undefined     | inline JSX css styling object                                                                                                               |
| Children     |   Yes    | ReactNode     | null          | What you wrap the Touchless tags around. This can e.g. be a button if you wish the button to be controllable through touchless interactions |

### \<MobileQR />

The \<MobileQR /> tag insert a unique QR code that contains a unique link, that will connect the smartphone to a website, from which they can controle your \<TouchlessApp>. This compenent can not receive any props.

## 5. Hooks

| Hook name           | Returns                                   | Input                                                                                                                                                                      | Use                                                                                                                                                                                                                                                      |
| ------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| useConnectionChange | boolean                                   | void                                                                                                                                                                       | Can be used to track status of connection on mobile. Value updates if a user connects with the QR code or disconnects                                                                                                                                    |
| useGoToStartElement | function                                  | void                                                                                                                                                                       | Can be called if you want to go back to the start element or needs to reset if you change page                                                                                                                                                           |
| useNewSession       | function                                  | void                                                                                                                                                                       | Can be called if you want to reset the connection session, thereby breaking connection with connected device and allows for a new device                                                                                                                 |
| useCustomKeys       | `{ initiate: function, clear: function }` | `{ swipeUp?: [key value as string], swipeDown?: [key value as string],swipeLeft?: [key value as string],swipeRight?: [key value as string],click?: [key value as string]}` | Can be used to overwrite gestures and translate them into other key events. You can then bind key events to these and create custom behaviour. After execution of the initate function, custom key events works until the clear function has been called |
| usePhoneUI          | function                                  | string                                                                                                                                                                     | Can be called if you want to change to UI on the connected phone. Takes HTML with inline CSS for styling as input. Calling this function will automatically disconnect the phone from the server.                                                        |

## 6. Usage

In order to use the library, you need to wrap your app in the Index file, with the TouchlessApp Component

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TouchlessApp } from 'touchless-navigation';

ReactDOM.render(
    <TouchlessApp>
        {' '}
        <App />{' '}
    </TouchlessApp>,
    document.getElementById('root')
);
```

## 7. Examples

### Example of all components and hooks in a document

```tsx
import React, { useEffect } from 'react'

import {  TouchlessApp,
          Touchless,
          MobileQR,
          useConnectionChange,
          useGoToStartElement,
          useNewSession,
          useCustomKeys,
          usePhoneUI } from 'touchless-navigation'

const YourApp = () => {
  // Custom hook: Returns true if connection is established
  const connectionStatus = useConnectionChange();

  // Custom hook: Returns a function, that can be called to set controlled element back to the beginning
  const goToStartElement = useGoToStartElement();

  // Custom Hook: Returns a function that can be called to reset the session ID, there by creating a new QR code and connection to the socket server
  const newSession = useNewSession();

  // Custom hook: Input is the gestures you want to overwrite to bind to other keys, so that you can make custom functions to run instead of default behavior, all are optional. Returns an object containing two functions: initiate and clear. When calling initiate all gestures are replaced, until the clear function is called.
  const {initiate: customKeysInit, clear: customKeyClear} = useCustomKeys({
    swipeUp: 'w',
    swipeDown: 's',
    swipeLeft: 'a',
    swipeRight: 'd',
    click: 'space'
  });

  // Custom hook: Returns a function that can be called to update the phone UI. Input is the HTML that you want to replace the phone UI with
  const setPhoneUI = usePhoneUI(
      `<div style='background: rgb(46,56,79); color: white;'>
        <p>The phone UI was just changed</p>
      </div>`
    );

  useEffect(()=>{
    console.log('I run every time the a users connects to me or disconnects')
    console.log('User is connected: ', connectionStatus);
  }, [connectionStatus]);

  return({
    /* Insert this to display a QR-code that creates a connection to your app through a websocket*/}
    { !connectionStatus && <MobileQR /> }

    <Touchless className="div-example" > {/* elements wrapped in Touchless Component can be navigated bewteen. */}
      <div>
        Div example
      </div>
    </Touchless>                        {/* set startElement props to true, to make it the first highlighted element*/}
    <Touchless className="empty-example" startElement={true}> {/* Works as a div*/}
      Empty component
    </Touchless>
    <Touchless onClick={goToStartElement}> {/* set onclick functions */}
      <button>
        Take me back to the beginning!
      </button>
    </Touchless>
    <Touchless onClick={newSession}> {/* start new session */}
      <button>
        Kick me out and get ready for the next user
      </button>
    </Touchless>
    <Touchless onClick={customKeysInit}> {/* use custom event */}
      <button>
        Use custom key events
      </button>
    </Touchless>
    <Touchless onClick={customKeysClear}> {/* go back to default navigation */}
      <button>
        Use default events for navigation again
      </button>
    </Touchless>
    <Touchless onClick={setPhoneUI}> {/* change the phone UI and disconnect the phone */}
      <button>
        Change the phone UI
      </button>
    </Touchless>
  )
}
```

### Custom Component - checkbox

```tsx
import * as React from 'react';
import { Touchless } from 'touchless-navigation';

export interface MyCheckboxProps {
    id: string;
    children: string;
    value: string;
}
// Onclick on the works automatic as it's default behaviour for label and input field, within a label
const MyCheckbox: React.SFC<MyCheckboxProps> = ({ id, children, value }) => {
    return (
        <label htmlFor={id}>
            <Touchless className='my-checkbox'>
                <input type='checkbox' id={id} name={id} value={value} />
                <label>{children}</label>
            </Touchless>
        </label>
    );
};

export default MyCheckbox;
```

### CSS Example

When an element is active/selected the element receives the 'active' classname.
The outermost component <TouchlessApp  /> has the 'touchless-app' as class, and <Touchless /> components has the 'touchless' class.
Here are some examples of how you can select active and inactive components for styling.

```css
/* When an element is active/selected, the element receives the .active class. Therefore this must be specified in the CSS to see the active/selected element.*/
.touchless-app .touchless .div-example {
    /* Insert styling for Element */
}
.touchless-app .touchless .div-example.active {
    /* Insert styling for element when it is the active element in the navigation */
}

/* OR */

.touchless-app .touchless .empty-example {
    /* Insert styling for Element */
}
.touchless-app .touchless.empty-example.active {
    /* Insert styling for element when it is the active element in the navigation */
}

/* OR */

.touchless-app .touchless > .button-example {
    /* Insert styling for Element */
}
.touchless-app .touchless.active > .button-example {
    /* Insert styling for element when it is the active element in the navigation */
}
```

## License

MIT © [Moroder95](https://github.com/Moroder95), [andershoegh](https://github.com/andershoegh), [lassestausgaard](https://github.com/lassestausgaard)
