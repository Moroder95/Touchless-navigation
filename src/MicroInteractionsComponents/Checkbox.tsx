import * as React from 'react';
import ListItem from './ListItem';

export interface CheckboxProps {
    id?: string;
    name: string;
    value: string;
    text: string;
}
 
const Checkbox: React.SFC<CheckboxProps> = ({ id, name, value, text}) => {
    return ( 
        <ListItem type={'checkbox'} id={id} name={name} value={value} text={text} />
     );
}
 
export default Checkbox;