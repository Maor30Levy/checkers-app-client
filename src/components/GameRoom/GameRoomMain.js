import React from 'react';
import BoardGame from './BoardGame';
import AddMessage from './AddMessage';
import Opponent from './Opponent';

const GameRoomMain = ({ setErrorMessage }) => {


    return (
        <div className="room__main">
            <Opponent />
            <BoardGame
                setErrorMessage={setErrorMessage}
            />
            <AddMessage />
        </div>
    )
};

export default GameRoomMain;