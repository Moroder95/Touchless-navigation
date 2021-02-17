import * as React from 'react';

export interface ListItemProps {
    type: 'checkbox' | 'radio';
    id?: string;
    name: string;
    value: string;
    text: string;
}
 
const ListItem: React.SFC<ListItemProps> = ({type, id, name, value, text}) => {
    return (
        <div>
            <input type={type} id={id} name={name} value={value} />
            <label htmlFor={value}> { text } </label>
        </div>
    );
}
 
export default ListItem;