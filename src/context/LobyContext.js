import React, { createContext, useReducer } from 'react';
import LobyReducer, { initialLobyData } from '../reducers/LobyReducer';

export const LobyContext = createContext();

const LobyContextProvider = (props) => {
    const [lobyData, lobyDataDispatch] = useReducer(LobyReducer, initialLobyData);
    return (
        <LobyContext.Provider value={{ lobyData, lobyDataDispatch }}>
            {props.children}
        </LobyContext.Provider>
    )
};

export default LobyContextProvider;