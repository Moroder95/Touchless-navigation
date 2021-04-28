import React from 'react';

import {
    Touchless,
    MobileQR,
    useConnectionChange,
    useGoToStartElement,
    useCustomKeys,
    useNewSession,
    usePhoneUI,
    useRedirectPhone
} from 'touchless-navigation';
import MyCheckbox from './MyCheckbox';
import TestBox from './TestBox';

const test = [1, 2, 3, 4, 5, 6, 7, 8];
const test4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const test2 = [1, 2];
const test3 = [1, 2];
const App = () => {
    const connectionStatus = useConnectionChange();
    const goToStartElement = useGoToStartElement();
    const setPhoneUI = usePhoneUI(
        `<div style="dipslay: flex; flex-direction: column; justify-content: flex-start; width: 80%; margin: auto">
            <h2>Thank you for participating!</h2>
            <p>Click the button below to answer a short questionnaire about your experience. <br />(approx. 5 minutes)</p>
            <button style="margin-top: 30px; padding: 1rem 2rem; width: fit-content; height: fit-content; font-size: 1rem">
                Go to questionnaire
            </button>
        </div>`
    );
    const redirectPhone = useRedirectPhone();

    const {clear, initiate } = useCustomKeys({
        swipeUp: 'w',
        swipeDown: 's',
        swipeLeft: 'a',
        swipeRight: 'd',
        click: 'space'
    });
 
    
    const newSession = useNewSession();
    React.useEffect(() => {
        const string = connectionStatus ? "" : "NOT ";
        console.log(string + "CONNECTED");
        
    }, [connectionStatus]);

    return (
       <>
            {!connectionStatus && (
                <div style={{ margin: '20px' }}>
                    <MobileQR logLink={true} />
                </div>
            )}
            <button onClick={goToStartElement}> Go home </button>
            <button onClick={clear}>CLEAR </button>
            <button onClick={initiate}>Initiate </button>
            <button onClick={newSession}>Start New Session</button>
            <button onClick={setPhoneUI}>Socket emit message</button>
            <button onClick={() => redirectPhone('https://google.com')}>
                Redirect phone
            </button>
            {test.map((el, index) => {
                return <TestBox el={el} key={index}></TestBox>;
            })}

            {test4.map((el, index) => {
                return (
                    <MyCheckbox
                        id={'test' + index}
                        value={'vehicle' + el}
                        key={index}
                    >
                        {'this is checkbox number: ' + index}
                    </MyCheckbox>
                );
            })}

            {test.map((el, index) => {
                return (
                    <Touchless
                        className='stuff'
                        style={{ backgroundColor: 'blue', color: 'white' }}
                        key={index}
                    >
                        {el}
                    </Touchless>
                );
            })}

            {test3.map((el, index) => {
                return (
                    <Touchless
                        className='stuff'
                        style={{ backgroundColor: 'red', color: 'white' }}
                        key={index}
                    >
                        {el}
                    </Touchless>
                );
            })}

            {test2.map((el, index) => {
                return (
                    <Touchless
                        className='stuff'
                        style={{ backgroundColor: 'yellow', color: 'black' }}
                        key={index}
                    >
                        {el}
                    </Touchless>
                );
            })}
            
        </>
        
    );
};

export default App;
