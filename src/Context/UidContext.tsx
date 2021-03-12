import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuid} from 'uuid';
export type UidContextType = { 
  uid: string; 
  newUid: () => void; 
  connection: boolean; 
  setConnection: Dispatch<SetStateAction<boolean>>;
  next: number;
  setNext: Dispatch<SetStateAction<number>>;
  customKeys: CustomKeysType;
  setCustomKeys: Dispatch<SetStateAction<CustomKeysType>>;
 }
export const UidContext = createContext<UidContextType>({uid:'', newUid: ()=>{}, connection: false, setConnection: ()=> {}, next: 0, setNext: ()=>{}, setCustomKeys: ()=>{}, customKeys:{}});

export interface UidContextProps {
    children: React.ReactNode
}
export type CustomKeysType = {
  swipeUp?: string
  swipeDown?: string
  swipeLeft?:  string
  swipeRight?:  string
  click?: string
}
const UidContextProvider: React.SFC<UidContextProps> = ({children}) => {
  const [uid, setUid] = useState(uuid());
  const [connection, setConnection] = useState<boolean>(false);
  const [next, setNext] = useState(0);
  const [customKeys, setCustomKeys] = useState<CustomKeysType>({});
  const newUid = ()=>{
    setUid(uuid());
  }
  return (
    <UidContext.Provider 
    value={{
      uid, 
      newUid, 
      connection, 
      setConnection, 
      next, 
      setNext, 
      customKeys,
      setCustomKeys
    }}>
      { children }
    </UidContext.Provider>
  );
}



export default UidContextProvider;