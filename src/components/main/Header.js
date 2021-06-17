import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutAction, setWindowAction } from '../../actions/loginActions';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { logoutUser } from '../../server/login';
import { emitRemoveUser } from '../../server/socket/loby-events';
import Forfeit from '../GameRoom/Forfeit';
import ToggleHeader from './ToggleHeader';
import Avatar from './Avatar';

const Header = () => {
    const { userData, userDataDispatch } = useContext(LoginContext);
    const { roomData } = useContext(GameRoomContext);
    const [isLogout, setisLogout] = useState(false);
    const [isGameOn, setIsGameOn] = useState(false);
    const isUserLoggedIn = userData.loggedIn;
    const history = useHistory();
    const user = userData.activeUser;

    const isSSR = typeof window !== "undefined";
    const [windowSize, setWindowSize] = useState({
        width: isSSR ? window.innerWidth : 1200,
        height: isSSR ? 800 : window.innerHeight,
    });
    useEffect(() => {
        userDataDispatch(setWindowAction(windowSize.width));
    }, [userDataDispatch, windowSize.width]);
    const changeWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);
        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);
    const [activeHeader, setActiveHeader] = useState(windowSize.width > 820 ? true : false);

    const logout = async () => {
        await logoutUser(userData.token, userData.activeUser);
        emitRemoveUser(userData.activeUser);
        userDataDispatch(logoutAction());
        history.push("/home");
    };

    const onClickExit = () => {
        setIsGameOn(true);
    };

    const onClickLogout = async () => {
        try {
            const socket = roomData.opponentSocket;
            if (socket !== '') {
                setisLogout(true);
                setIsGameOn(true);
            }
            else await logout();

        } catch (err) {
            console.log(err)
        }

    };

    return (

        <div className="header_container">
            {isGameOn && <Forfeit
                setisLogout={setisLogout}
                isLogout={isLogout}
                setIsGameOn={setIsGameOn}
            />}
            <ToggleHeader
                setActiveHeader={setActiveHeader}
                activeHeader={activeHeader}
            />

            {activeHeader && <div className="header">

                <div className="header__nav">
                    <NavLink to="/home" className="home-nav" activeClassName="header__active-link">Home</NavLink>
                    <div>{
                        roomData.isGameOn &&
                        <div className="gameroom__nav">
                            <NavLink to="/game-room" className="home-nav" activeClassName="header__active-link">Game Room</NavLink>
                            <button onClick={onClickExit} className="exit-game">Exit Game</button>
                        </div>

                    }
                    </div>
                    <NavLink to="/loby" className="home-nav" activeClassName="header__active-link" >Loby </NavLink>
                    <div className="login__nav">
                        {isUserLoggedIn ?
                            <div className="logged-in">
                                <div className="logout" onClick={onClickLogout}>Hello {user}, Logout</div>
                                <Avatar buffer={userData.avatar} />
                            </div> :
                            <NavLink to="/login" activeClassName="header__active-link">Login</NavLink>
                        }

                    </div>

                </div>
            </div>}
        </div>
    )
};

export default Header;