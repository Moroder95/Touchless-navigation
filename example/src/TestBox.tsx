import * as React from 'react';
import { Touchless } from 'touchless-navigation';

export interface TestBoxProps {
    el: number
}
 
const TestBox: React.SFC<TestBoxProps> = ({el}) => {
    const [checked, setChecked] = React.useState<boolean>(false);
    return ( 
        <Touchless style={{backgroundColor: "orange", color: "white"}} onClick={()=> setChecked((ol: boolean) => {
            console.log('changing ol= ' + ol);
            console.log('To ol= ' + !ol);
            return !ol;
        })} className={`test stuff ${
            checked ? "bg-blue-100" : ""
            }`}>
                {'I am number: ' + el}<br/>
            {'Am I selected: ' + (checked ? 'X': ' ')}
        </Touchless>
     );
}
 
export default TestBox;
