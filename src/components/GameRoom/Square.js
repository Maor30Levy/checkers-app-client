import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { anotherJumpAction, jumpAction, setBoardAction, setKingAction } from '../../actions/BoardActions';
import { changeTeamAction } from '../../actions/gameRoomActions';
import { BoardContext } from '../../context/BoardContext';
import { GameRoomContext } from '../../context/GameRoomContext';
import { hasAnotherJumps, isLegalPlay, isToBeCoronated } from '../../game/rules';
import { emitChangeTeam, emitCoronation, emitJump, emitPlay } from '../../server/socket/gameroom-events';


export default function Square(props) {
    const { boardState, boardStateDispatch } = useContext(BoardContext);
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const jump = (index) => {
        boardStateDispatch(jumpAction(index));
        emitJump(index, roomData.opponentSocket);
    };
    const executePlay = (fromCell, toCell) => {
        boardStateDispatch(setBoardAction(fromCell, toCell, true));
        emitPlay(fromCell, toCell, roomData.opponentSocket);
    };
    const coronate = (index) => {
        boardStateDispatch(setKingAction(index));
        emitCoronation(index, roomData.opponentSocket);
    };

    const playTurn = (fromCell, toCell) => {
        const middlePieceIndex = (fromCell + toCell) / 2;
        const middlePiece = boardState.board[middlePieceIndex];
        const isKing = boardState.board[fromCell].isKing;
        const anotherJump = !!middlePiece && hasAnotherJumps(toCell, boardState.board);
        console.log(anotherJump);
        executePlay(fromCell, toCell);
        if (!!middlePiece) {
            jump(middlePieceIndex);
            boardStateDispatch(anotherJumpAction(anotherJump, toCell));
        } else boardStateDispatch(anotherJumpAction(false, undefined));
        if (isToBeCoronated(toCell, isKing))
            coronate(toCell);
        if (!anotherJump) {
            roomDataDispatch(changeTeamAction());
            emitChangeTeam(roomData.opponentSocket);
        }
    }
    const [, drop] = useDrop(
        () => ({
            accept: 'piece',
            canDrop: (monitor) => {
                try {
                    const fromCell = monitor.id;
                    const toCell = props.id;
                    const middlePieceIndex = (fromCell + toCell) / 2;
                    const middlePiece = boardState.board[middlePieceIndex];
                    const isKing = boardState.board[fromCell].isKing;
                    return isLegalPlay(fromCell, toCell, isKing, middlePiece, boardState.board, boardState.hasAnotherJump, boardState.jumpOrigin)

                } catch (err) {
                    // props.setErrorMessage(err.message)
                    return false;
                }


            },
            drop: (monitor) => {
                playTurn(monitor.id, props.id);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }));
    return (

        <div ref={drop} className={props.className}>
            {props.children}
        </div>

    )
}
