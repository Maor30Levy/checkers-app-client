import React, { useContext, useEffect, useState } from 'react';
import { LobyContext } from '../../context/LobyContext';
import Loader from '../main/Loader';
import LobyUsers from './LobyUsers';
import { updateUser } from '../../server/users';
import { LoginContext } from '../../context/LoginContext';
import MessageUser from './MessageUser';
import {
    getIncomeRequest, offIncomeRequestListener,
    getAcknowledge, offAcknowledgeListener, emitRemoveUser
} from '../../server/socket/loby-events';

import { GameRoomContext } from '../../context/GameRoomContext';
import { isGameOnAction, setOpponentAction, setSocketAction, startingTeamAction } from '../../actions/gameRoomActions';
import RequestMessage from './RequestMessage';
import { useHistory } from 'react-router';
import LeaderBoard from './LeaderBoard';

const Loby = () => {
    const [userReciepient, setUserReciepient] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    const history = useHistory();
    const { lobyData } = useContext(LobyContext);
    const { userData } = useContext(LoginContext);
    const { roomDataDispatch } = useContext(GameRoomContext);
    const [openClass, setOpenClass] = useState('')
    useEffect(() => {
        setOpenClass(!userData.activeHeader ? ' header__gap' : '');

    }, [userData.activeHeader]);

    useEffect(() => {
        const requestListener = ({ fromSocket, host }) => {
            roomDataDispatch(setSocketAction(fromSocket));
            roomDataDispatch(setOpponentAction(host));
            setRequestMessage(host);
        };

        const acknowledgeListener = (response) => {
            if (response.response) {
                roomDataDispatch(setSocketAction(response.fromSocket));
                roomDataDispatch(startingTeamAction(response.team));
                updateUser(userData.token, response.fromSocket);
                emitRemoveUser(userData.activeUser);
                roomDataDispatch(isGameOnAction());
                history.push('/game-room');
            }
        };

        getIncomeRequest(requestListener);
        getAcknowledge(acknowledgeListener);
        return () => {
            offIncomeRequestListener(requestListener);
            offAcknowledgeListener(acknowledgeListener);
        }
    }, [roomDataDispatch, history, userData.token, userData.activeUser]);

    return (
        <div className={'loby-container' + openClass}>
            {
                lobyData.isUsersLoaded ?
                    <div className='loby'>
                        <LobyUsers
                            setUserReciepient={setUserReciepient}
                        />
                        <LeaderBoard />
                        {!!userReciepient && <MessageUser
                            userReciepient={userReciepient}
                            setUserReciepient={setUserReciepient}
                        />}
                        {!!requestMessage && <RequestMessage
                            setRequestMessage={setRequestMessage}
                            requestMessage={requestMessage}
                        />}
                    </div>

                    :
                    <Loader />
            }
        </div>
    )
};

export default Loby;