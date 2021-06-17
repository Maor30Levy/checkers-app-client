import React, { useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardContext } from '../../context/BoardContext';
import {
    jumpAction, setBoardAction,
    setKingAction, initTeamAction
} from '../../actions/BoardActions';
import {
    getPlay, getJump, getChangeTeam, offIncomePlay, offIncomeCoronation,
    offIncomeJump, offIncomeChangeTeam, getCoronation,
} from '../../server/socket/gameroom-events';
import { GameRoomContext } from '../../context/GameRoomContext';
import { changeTeamAction } from '../../actions/gameRoomActions';
import Square from './Square';
import Piece from './Piece';


const BoardGame = ({ setErrorMessage }) => {
    const { boardState, boardStateDispatch } = useContext(BoardContext);
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);

    useEffect(() => {
        const playListener = ({ fromCell, toCell }) => {
            boardStateDispatch(setBoardAction(fromCell, toCell, false));
            // gameOverRoutine(boardState.board);
        };

        const coronationListener = ({ index }) => {
            boardStateDispatch(setKingAction(index));
        };

        const jumpListener = ({ index }) => {
            boardStateDispatch(jumpAction(index));
        };

        const changeTeamListener = () => {
            roomDataDispatch(changeTeamAction());
        };

        boardStateDispatch(initTeamAction(roomData.startingTeam));
        getPlay(playListener);
        getCoronation(coronationListener);
        getJump(jumpListener);
        getChangeTeam(changeTeamListener);

        return () => {
            offIncomePlay(playListener);
            offIncomeCoronation(coronationListener);
            offIncomeJump(jumpListener);
            offIncomeChangeTeam(changeTeamListener);
        }
    }, [boardStateDispatch, roomDataDispatch, roomData.startingTeam]);
    //, boardState.board, roomData.startingTeam

    // const gameOverRoutine = (board) => {
    //     if (!(hasValidPlays(board)))
    //         endGame();
    // };

    // const endGame = () => { };

    const addPiece = (isBrightTeam, isKing, i) => {
        const className = `${isBrightTeam ? "bright" : "dark"} piece ${isKing ? "king" : ""}`;
        return (
            isBrightTeam ?
                <Piece piece={{ type: className, id: i }} /> :
                <div className={className} />
        )
    };

    return (
        <div className="board-container">
            <DndProvider backend={HTML5Backend}>
                <div className="board">
                    {boardState.board.map((square, i) => {
                        return (
                            square.isDark ?
                                <Square className="square-black" id={i} key={square.id} setErrorMessage={setErrorMessage}>
                                    {square.hasApiece && addPiece(square.isBrightTeam, square.isKing, i)}</Square> :
                                <div className="square-white" />
                        )
                    }
                    )}
                </div>
            </DndProvider >
        </div >
    )
};

export default BoardGame;