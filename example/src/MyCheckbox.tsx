import * as React from 'react';
import { Touchless } from 'touchless-navigation';

export interface MyCheckboxProps {
    id: string
    children: string
    value: string
}
 
const MyCheckbox: React.SFC<MyCheckboxProps> = ({ id, children, value}) => {
    return ( 
        <label htmlFor={id}>      
            <Touchless className="my-checkbox">
                <input type="checkbox" id={id} name={id} value={value}/>
                <label>{ children }</label>
            </Touchless>
        </label>
     );
}
 
export default MyCheckbox;