import React from 'react'

import {  Touchless, MobileQR, useConnectionChange, useGoToStartElement, useCustomKeys, useNewSession } from 'touchless-navigation';
import MyCheckbox from './MyCheckbox';
import TestBox from './TestBox';


const test = [1,2,3,4,5,6,7,8];
const test4 = [1,2,3,4,5,6,7,8,9];
const test2 = [1, 2];
const test3 = [1, 2];
const App = () => {

  const connectionStatus = useConnectionChange();
  const goToStartElement = useGoToStartElement();
  // const customKeyRef = useCustomKeys;
  const activateCustomKeys = useCustomKeys({
    swipeUp: 'w',
    swipeDown: 's',
    swipeLeft: 'a',
    swipeRight: 'd',
    click: 'space'
  });
  // const clearKeyRef = clearCustomKeys();
  const newSession = useNewSession();
  return( 
  <>

      
      { !connectionStatus && <div style={{margin: "20px"}}><MobileQR logLink={true} /></div> }
      <button onClick={goToStartElement}> Go home </button>
      <button onClick={activateCustomKeys.clear}>CLEAR </button>
      <button onClick={activateCustomKeys.initiate}>Initiate </button>
      <button onClick={newSession}>Start New Session</button>
        {test.map((el, index) =>{
          return <TestBox el={el} key={index}></TestBox>
        })}

        {test4.map((el, index) =>{
          return(
            <MyCheckbox id={'test' + index} value={'vehicle'+el} key={index}>
              {'this is checkbox number: ' + index}
            </MyCheckbox>
          )
        })}

        {test.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "blue", color: "white"}} key={index}>{el}</Touchless>
        })}
    
        {test3.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "red", color: "white"}} key={index}>{el}</Touchless>
        })}
   
        {test2.map((el, index) =>{
          return <Touchless className="stuff" style={{backgroundColor: "yellow", color: "black"}} key={index}>{el}</Touchless>
        })}
     
  </>)
}

export default App
