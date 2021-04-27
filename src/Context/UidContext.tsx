import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuid} from 'uuid';
export type UidContextType = { 
  uid: string; 
  newUid: () => void; 
  connection: boolean; 
  setConnection: Dispatch<SetStateAction<boolean>>;
  next: number;
  setNext: Dispatch<SetStateAction<number>>;
  freeCursor: boolean; 
  setFreeCursor: Dispatch<SetStateAction<boolean>>;
 }
export const UidContext = createContext<UidContextType>({uid:'', newUid: ()=>{}, connection: false, setConnection: ()=> {}, next: 0, setNext: ()=>{}, freeCursor: false, setFreeCursor: ()=> {}});

export interface UidContextProps {
    children: React.ReactNode
}

const UidContextProvider: React.SFC<UidContextProps> = ({children}) => {
  const [uid, setUid] = useState(uuid());
  const [connection, setConnection] = useState<boolean>(false);
  const [freeCursor, setFreeCursor] = useState<boolean>(false);
  const [next, setNext] = useState(0);
 
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
      freeCursor,
      setFreeCursor
    }}>
      { children }
    </UidContext.Provider>
  );
}



export default UidContextProvider;