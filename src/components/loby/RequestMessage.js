import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { isGameOnAction, setOpponentAction, setSocketAction, startingTeamAction } from '../../actions/gameRoomActions';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { emitRemoveUser, response } from '../../server/socket/loby-events';
import { updateUser } from '../../server/users';

const RequestMessage = ({ setRequestMessage, requestMessage }) => {
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const { userData } = useContext(LoginContext);
    const histoty = useHistory();

    const getTeams = () => {
        const num = Math.floor(Math.random() * 2);
        const team = num === 0;
        const opponentTeam = !team;
        return { team, opponentTeam };
    };

    const onClickAccept = () => {
        const { team, opponentTeam } = getTeams();
        roomDataDispatch(startingTeamAction(team));
        roomDataDispatch(setOpponentAction(requestMessage));
        response(true, roomData.opponentSocket, opponentTeam);
        updateUser(userData.token, roomData.opponentSocket);
        emitRemoveUser(userData.activeUser);
        roomDataDispatch(isGameOnAction());
        histoty.push('/game-room');
        setRequestMessage('');
    }
    const onClickDecline = () => {
        roomDataDispatch(setSocketAction(''));
        response(false, roomData.opponentSocket, '');
        setRequestMessage('');
    }

    return (
        <div className="message-user">
            <div className="message-user__body">
                <h4>{requestMessage} invited you to a match</h4>
                <button onClick={onClickAccept}>Accept</button>
                <button onClick={onClickDecline} className="cancel">Decline</button>
            </div>
        </div>

    )
};

export default RequestMessage;