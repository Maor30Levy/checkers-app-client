import React, { useContext, useEffect, useState } from 'react';
import { GameRoomContext } from '../../context/GameRoomContext';



const Opponent = () => {
    const { roomData } = useContext(GameRoomContext);
    const [turn, setTurn] = useState('')
    useEffect(() => {
        setTurn(roomData.isTurnToPlay ? "Your turn to play" : `${roomData.opponent}'s turn to play`)
    }, [roomData.isTurnToPlay, roomData.opponent])
    return (
        <div className="opponent">{turn}</div>
    )
};

export default Opponent;