import React from 'react';
import LobyContextProvider from '../../context/LobyContext';
import Loby from './Loby';

const LobyLoader = () => {
    return (
        <LobyContextProvider>
            <Loby />
        </LobyContextProvider>

    )
};

export default LobyLoader;