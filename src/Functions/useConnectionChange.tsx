import * as React from 'react';
import { UidContext } from '../Context/UidContext';

function useConnectionChange(){
    const { connection } = React.useContext(UidContext);
    return connection;
};

export default useConnectionChange;