import React, { useContext } from 'react';
import  QRCode from 'react-qr-code';
import { host } from '../Settings/host';
import { UidContext } from '../Context/UidContext';

export interface MobileQRProps {
    logLink?: boolean;
}
 
const MobileQR: React.SFC<MobileQRProps> = ({logLink = false }) => {
    
    const  { uid, freeCursor } = useContext(UidContext);
    
    const touchpad = freeCursor ? 'TouchPad' : 'Highlight';
    const link = `${host}/phone${touchpad}?id=${uid}`;

    logLink ? console.log(link) : null;
    
    return uid ? <QRCode value={ link }/> : null;
        
}
 
export default MobileQR;