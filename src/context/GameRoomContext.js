import React, { createContext, useReducer } from 'react';
import GameRoomReducer, { initialRoomData } from '../reducers/GameRoomReducer';

export const GameRoomContext = createContext();

const GameRoomContextProvider = (props) => {
    const [roomData, roomDataDispatch] = useReducer(GameRoomReducer, initialRoomData);
    return (
        <GameRoomContext.Provider value={{ roomData, roomDataDispatch }}>
            {props.children}
        </GameRoomContext.Provider>
    )
};

export default GameRoomContextProvider;