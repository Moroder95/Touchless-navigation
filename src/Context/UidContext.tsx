import React, { createContext, useReducer, useEffect, useState, useCallback } from 'react';
import { v4 as uuid} from 'uuid';
export type UidContextType = { uid: string; newUid: () => void; }
export const UidContext = createContext<UidContextType>({uid:'', newUid: ()=>{}});

export interface UidContextProps {
    children: React.ReactNode
}

const UidContextProvider: React.SFC<UidContextProps> = ({children}) => {
  const [uid, setUid] = useState(uuid());
  const newUid = ()=>{
    setUid(uuid());
  }
  return (
    <UidContext.Provider value={{uid, newUid}}>
      { children }
    </UidContext.Provider>
  );
}
 
export default UidContextProvider;