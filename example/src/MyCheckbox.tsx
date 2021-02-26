import * as React from 'react';
import { Touchless } from 'cant-touch-this';

export interface MyCheckboxProps {
    id: string
    children: string
    value: string
}
 
const MyCheckbox: React.SFC<MyCheckboxProps> = ({ id, children, value}) => {
    return ( 
        <label htmlFor={id}>      
            <Touchless className="stuff" style={{backgroundColor: "lightBlue", color: "white"}}>
                <input type="checkbox" id={id} name={id} value={value}/>
                <label>{ children }</label>
            </Touchless>
        </label>
     );
}
 
export default MyCheckbox;