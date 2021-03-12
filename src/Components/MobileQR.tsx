import React, { useContext } from 'react';
import  QRCode from 'react-qr-code';
import { host } from '../Settings/host';
import { UidContext } from '../Context/UidContext';

export interface MobileQRProps {
    logLink?: boolean;
}
 
const MobileQR: React.SFC<MobileQRProps> = ({logLink = false }) => {
    
    const  { uid } = useContext(UidContext);
    const link = `${host}/phone?id=${uid}`;

    logLink ? console.log(link) : null;
    
    return uid ? <QRCode value={ link }/> : null;
        
}
 
export default MobileQR;