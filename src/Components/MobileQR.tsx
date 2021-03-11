import React, { useContext } from 'react';
import { validate } from 'uuid';
import  QRCode from 'react-qr-code';
import { host } from '../Settings/host';
import { UidContext } from '../Context/UidContext';

export interface MobileQRProps {
    logLink?: boolean;
}
 
const MobileQR: React.SFC<MobileQRProps> = ({logLink = false }) => {
    
    const  { uid } = useContext(UidContext);
    if(logLink){
        console.log(`${host}/phone?id=${uid}`)
    }
    

    return validate(uid) ? <QRCode value={`${host}/phone?id=${uid}` } /> : null;
        
}
 
export default MobileQR;