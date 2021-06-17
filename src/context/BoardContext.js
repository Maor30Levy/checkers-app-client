import React, { createContext, useEffect, useReducer } from 'react';
import { initBoardAction } from '../actions/BoardActions';
import BoardReducer, { initialBoardState } from '../reducers/BoardReducer';

export const BoardContext = createContext();

const BoardContextProvider = (props) => {
    const [boardState, boardStateDispatch] = useReducer(BoardReducer, initialBoardState);
    useEffect(() => {
        boardStateDispatch(initBoardAction());
    }, []);
    return (
        <BoardContext.Provider value={{ boardState, boardStateDispatch }}>
            {props.children}
        </BoardContext.Provider>
    )
};

export default BoardContextProvider;