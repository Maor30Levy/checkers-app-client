import { nanoid } from "nanoid";

const isSquareDark = (index) => {
    const isEvenColumn = index % 2 === 0;
    const isEvenRow = Math.floor(index / 8) % 2 === 0;

    if (isEvenRow) {
        return isEvenColumn ? false : true;
    } else {
        return isEvenColumn ? true : false;
    }
};

const setSquares = () => {
    const squares = [];
    const darkCells = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
    const brightCells = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62];
    for (let i = 0; i < 64; i++) {
        const isBrightTeam = brightCells.includes(i) ?
            true :
            false;
        const isDark = isSquareDark(i)
        squares.push({
            isDark,
            hasApiece: isBrightTeam || darkCells.includes(i) ? true : false,
            id: nanoid(),
            isBrightTeam,
            isKing: false
        });
    }
    return squares;
};

export const initialBoardState = {
    board: [],
    isBrightTeam: false,
    activeCell: '',
    hasAnotherJump: false,
    jumpOrigin: undefined

};



const BoardReducer = (boardState, action) => {
    switch (action.type) {
        case "INIT":
            return {
                ...boardState,
                board: setSquares()
            }
        case "SET_BOARD":
            {
                const newBoard = boardState.board;
                newBoard[action.fromIndex].hasApiece = false;
                newBoard[action.fromIndex].isBrightTeam = false;
                newBoard[action.toIndex].hasApiece = true;
                newBoard[action.toIndex].isBrightTeam = action.isBrightTeam;
                newBoard[action.toIndex].isKing = newBoard[action.fromIndex].isKing;
                newBoard[action.fromIndex].isKing = false;
                return {
                    ...boardState,
                    board: newBoard
                };
            }
        case "SET_KING":
            {
                const newBoard = boardState.board;
                newBoard[action.index].isKing = true;
                return {
                    ...boardState,
                    board: newBoard
                };
            }
        case "JUMP":
            {
                const newBoard = boardState.board;
                newBoard[action.index].isKing = false;
                newBoard[action.index].isBrightTeam = false;
                newBoard[action.index].hasApiece = false;
                return {
                    ...boardState,
                    board: newBoard
                };
            }
        case "INIT_TEAM":
            return {
                ...boardState,
                isBrightTeam: action.team
            }

        case "SET_TEAM":
            return {
                ...boardState,
                isBrightTeam: action.isBrightTeam
            }
        case "ANOTHER_JUMP":
            return {
                ...boardState,
                hasAnotherJump: action.hasAnotherJump,
                jumpOrigin: action.hasAnotherJump ? action.jumpOrigin : undefined
            }
        case "DELETE":
            return {
                initialBoardState
            }
        default:
            return boardState;
    }
};

export default BoardReducer;