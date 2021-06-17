import { errorMessages } from "./errors";
import { getColGap, getRow, getRowGap } from "./utils";

export const isLegalPlay = (fromCell, toCell, isKing, middlePiece, board, hasAnotherJump, jumpOrigin) => {
    try {
        isAnotherJump(hasAnotherJump, fromCell, jumpOrigin);
        isLegalMove(fromCell, toCell, isKing, middlePiece);
        isValidJump(fromCell, toCell, board);
    } catch (err) {
        throw err;
    }


    return true;
};

export const isToBeCoronated = (index, isKing) => (index < 8 && !isKing);
export const needToJump = (middlePiece) => (!middlePiece);


const isLegalMove = (fromCell, toCell, isKing, middlePiece) => {
    const rowGap = getRowGap(fromCell, toCell);
    const colGap = getColGap(fromCell, toCell);
    if (!(isMoveDiagonal(rowGap, colGap))) throw new Error(errorMessages[4]);
    if (!isKing && !(isMoveForward(fromCell, toCell))) throw new Error(errorMessages[3]);
    if (!(isValidGap(rowGap))) throw new Error(errorMessages[5]);
    if (!(isLegalJump(rowGap, middlePiece))) throw new Error(errorMessages[5]);
    return true;
};

const isAnotherJump = (hasAnotherJump, fromCell, jumpOrigin) => {
    if (hasAnotherJump && fromCell !== jumpOrigin)
        throw new Error(errorMessages[1]);
};

const isValidJump = (fromCell, toCell, board) => {
    const rowGap = getRowGap(fromCell, toCell);
    if (rowGap === 1 && hasValidJumps(board))
        throw new Error(errorMessages[2]);

}

const isMoveForward = (fromCell, toCell) => (getRow(fromCell) >= getRow(toCell));
const isMoveDiagonal = (rowGap, columnGap) => (rowGap === columnGap && columnGap > 0);
const isValidGap = (rowGap) => (rowGap <= 2);
const isLegalJump = (rowGap, middlePiece) => (rowGap !== 2 ||
    (middlePiece.hasApiece && !middlePiece.isBrightTeam));

const hasValidMoves = (fromCell, board, onlyJumps) => {
    const brightTeam = fromCell !== undefined ? [fromCell] :
        (board.map((cell, i) => {
            if (cell.isBrightTeam) return i;
            return undefined;
        })).filter((cell) => (cell >= 0));
    const vacantCells = (board.map((cell, i) => {
        if (!cell.hasApiece && cell.isDark) return i;
        return undefined;
    })).filter((cell) => (cell >= 0));
    let hasValid = false;
    for (let i = 0; i < brightTeam.length && !hasValid; i++) {
        for (let j = 0; j < vacantCells.length && !hasValid; j++) {
            const fromCell = brightTeam[i];
            const toCell = vacantCells[j];
            try {
                hasValid = isLegalMove(fromCell, toCell, board[fromCell].isKing, board[(fromCell + toCell) / 2]) &&
                    (!onlyJumps || getRowGap(fromCell, toCell) === 2);

            } catch (err) {
                continue;
            }
        }
    }
    return hasValid;

};

export const hasValidPlays = (board) => (hasValidMoves(undefined, board, false));

const hasValidJumps = (board) => (hasValidMoves(undefined, board, true));

export const hasAnotherJumps = (fromCell, board) => (hasValidMoves(fromCell, board, true));
