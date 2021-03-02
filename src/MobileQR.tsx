import React, { useContext } from 'react';
import { validate } from 'uuid';
import  QRCode from 'react-qr-code';
// const QRCode = require('qrcode.react')
import {host} from './host';
import { UidContext } from './Context/UidContext';

export interface MobileQRProps {

}
 
const MobileQR: React.SFC<MobileQRProps> = () => {
    
    const  { uid } = useContext(UidContext);
    console.log(`${host}/phone?id=${uid}`)

    return validate(uid) ? <QRCode value={`${host}/phone?id=${uid}`} /> : null;
        
}
 
export default MobileQR;