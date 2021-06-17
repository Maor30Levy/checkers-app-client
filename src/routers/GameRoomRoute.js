import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { GameRoomContext } from '../context/GameRoomContext';

const GameRoomRoute = ({ component: Component, ...rest }) => {
    const { roomData } = useContext(GameRoomContext);
    return (
        <Route
            {...rest}
            component={(props) => {
                return (
                    roomData.isGameOn ?
                        <Component {...props} /> :
                        <Redirect to="/home" />

                )
            }
            }
        />
    )
};

export default GameRoomRoute;