import * as React from 'react';
import ListItem from './ListItem';

export interface RadioButtonProps {
    id?: string;
    name: string;
    value: string;
    text: string;
}
 
const RadioButton: React.SFC<RadioButtonProps> = ({ id, name, value, text}) => {
    return ( 
        <ListItem type={'radio'} id={id} name={name} value={value} text={text} />
     );
}
 
export default RadioButton;