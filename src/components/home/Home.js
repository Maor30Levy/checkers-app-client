import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';

const Home = () => {
    const { userData } = useContext(LoginContext);
    const [openClass, setOpenClass] = useState('');
    const [src, setSrc] = useState(512);

    useEffect(() => {
        setOpenClass(!userData.activeHeader ? ' header__gap' : '');

    }, [userData.activeHeader]);
    useEffect(() => {
        setSrc(userData.windowWidth > 430 ? 512 : 192);

    }, [userData.windowWidth]);

    return (
        <div className={"home" + openClass}>
            <img src={"./logo" + src + ".png"} alt="board" />
        </div>
    )
};

export default Home;