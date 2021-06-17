import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { setHeaderAction } from '../../actions/loginActions';
const ToggleHeader = ({ setActiveHeader, activeHeader }) => {
    const [openClass, setOpenClass] = useState('');
    const { userDataDispatch } = useContext(LoginContext);
    const onClickToggle = () => {
        setActiveHeader(!activeHeader);
        userDataDispatch(setHeaderAction(activeHeader));
        setOpenClass(!activeHeader ? " open" : "");
    }

    return (
        <div className={"toggle_container" + openClass} onClick={onClickToggle}>
            <div className="toggle">

            </div>
        </div>
    )
};

export default ToggleHeader;