import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { initBoardAction } from '../../actions/BoardActions';
import { initRoomAction } from '../../actions/gameRoomActions';
import { logoutAction } from '../../actions/loginActions';
import { BoardContext } from '../../context/BoardContext';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { logoutUser } from '../../server/login';
import { emitForfeit } from '../../server/socket/gameroom-events';
import { emitRemoveUser } from '../../server/socket/loby-events';
const Forfeit = ({ setisLogout, isLogout, setIsGameOn }) => {
    const { userData, userDataDispatch } = useContext(LoginContext);
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const { boardStateDispatch } = useContext(BoardContext);
    const history = useHistory();

    const forfeitGame = () => {
        emitForfeit(userData.activeUser, roomData.opponentSocket)
        roomDataDispatch(initRoomAction());
        boardStateDispatch(initBoardAction());
    };

    const logout = async () => {
        await logoutUser(userData.token, userData.activeUser);
        emitRemoveUser(userData.activeUser);
        userDataDispatch(logoutAction());
    };

    const onClickContinue = () => {
        setIsGameOn(false);
        if (isLogout) setisLogout(false);
    };

    const onClickExit = async () => {
        const destination = isLogout ? '/home' : '/loby';
        forfeitGame();
        if (isLogout) {
            setisLogout(false);
            await logout();
        }
        setIsGameOn(false);
        history.push(destination);
    };

    return (
        <div className="message-user">
            <div className="message-user__body">
                <h4> Are you sure you want to forfeit and exit the game?</h4>
                <button onClick={onClickContinue}>Continue Game</button>
                <button onClick={onClickExit} className="cancel">Exit Game</button>
            </div>
        </div>
    )
};

export default Forfeit;