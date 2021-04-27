import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

export interface CustomKeysContextType {
    customKeys: CustomKeysType;
    setCustomKeys: Dispatch<SetStateAction<CustomKeysType>>;
}
export interface CustomKeysContextProps {
    children: React.ReactNode;
}

export const CustomKeysContext = createContext<CustomKeysContextType>({setCustomKeys: ()=>{}, customKeys:{}});

export type CustomKeysType = {
    swipeUp?: string
    swipeDown?: string
    swipeLeft?:  string
    swipeRight?:  string
    click?: string
  }
const CustomKeysContextProvider: React.SFC<CustomKeysContextProps> = ({ children }) => {
    const [customKeys, setCustomKeys] = useState<CustomKeysType>({})
    
    return ( 
        <CustomKeysContext.Provider value={{customKeys, setCustomKeys}}>
            { children }
        </CustomKeysContext.Provider>
     );
}
 
export default CustomKeysContextProvider;