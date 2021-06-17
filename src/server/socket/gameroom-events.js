import { socket } from './socket';
import { oppositeMove } from "../../game/utils";

//Messages
export const broadcastMessage = (toSocket, message) => {
    socket.emit('message', { toSocket, message });
};

export const typing = (toSocket, isTyping) => {
    socket.emit('typing', { toSocket, isTyping });
};

export const getTyping = (listener) => {
    socket.on('incomeTyping', listener);
};

export const getMessage = (listener) => {
    socket.on('incomeMessage', listener);
};

export const offIncomeTyping = (listener) => {
    socket.off('incomeTyping', listener);
};

export const offIncomeMessage = (listener) => {
    socket.off('incomeMessage', listener);
};



//Play

export const emitPlay = (fromCell, toCell, toSocket) => {
    const { oppositeFrom, oppositeTo } = oppositeMove(fromCell, toCell);
    socket.emit('play', { oppositeFrom, oppositeTo, toSocket });
};

export const getPlay = (listener) => {
    socket.on('incomePlay', listener);
};

export const offIncomePlay = (listener) => {
    socket.off('incomePlay', listener);
};

export const emitCoronation = (cell, toSocket) => {
    const { oppositeFrom } = oppositeMove(cell, 0);
    socket.emit('coronation', { index: oppositeFrom, toSocket });
};

export const getCoronation = (listener) => {
    socket.on('incomeCoronation', listener);
};

export const offIncomeCoronation = (listener) => {
    socket.off('incomeCoronation', listener);
};

export const emitJump = (cell, toSocket) => {
    const { oppositeFrom } = oppositeMove(cell, 0);
    socket.emit('jump', { index: oppositeFrom, toSocket });
};

export const getJump = (listener) => {
    socket.on('incomeJump', listener);
};

export const offIncomeJump = (listener) => {
    socket.off('incomeJump', listener);
};

export const emitChangeTeam = (toSocket) => {
    socket.emit('changeTeam', { toSocket });
};

export const getChangeTeam = (listener) => {
    socket.on('incomeChangeTeam', listener);
};

export const offIncomeChangeTeam = (listener) => {
    socket.off('incomeChangeTeam', listener);
};

export const emitForfeit = (username, opponentSocket) => {
    socket.emit('forfeit', { username, opponentSocket });
};

export const getOpponentForfeited = (listener) => {
    socket.on('opponentForfeited', listener);
};

export const offOpponentForfeited = (listener) => {
    socket.off('opponentForfeited', listener);
};



