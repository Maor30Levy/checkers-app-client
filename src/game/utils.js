export const oppositeMove = (fromCell, toCell) => {
    return { oppositeFrom: 63 - fromCell, oppositeTo: 63 - toCell }
};
export const getRow = (cell) => (Math.floor(cell / 8));
export const getCol = (cell) => (cell % 8);
export const getRowGap = (fromCell, toCell) => Math.abs((getRow(fromCell) - getRow(toCell)));
export const getColGap = (fromCell, toCell) => Math.abs((getCol(fromCell) - getCol(toCell)));
