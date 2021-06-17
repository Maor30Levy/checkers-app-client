import { socket } from './socket';


//Invitations to play
export const sendMessageToUser = (username, fromUser) => {
    socket.emit('messageToUser', username, fromUser);
};

export const getIncomeRequest = (listener) => {
    socket.on('incomeRequest', listener);
};

export const response = (response, toSocket, team) => {
    socket.emit('response', { response, team, toSocket });
};

export const getAcknowledge = (listener) => {
    socket.on('acknowledge', listener);
};

export const offIncomeRequestListener = (listener) => {
    socket.off('incomeRequest', listener);
};

export const offAcknowledgeListener = (listener) => {
    socket.off('acknowledge', listener);
};



//Add Available User
export const emitAddUser = (username) => {
    socket.emit('addUser', username);
};

export const getAddUser = (listener) => {
    socket.on('addUserToDisplay', listener);
};

export const offAddUserListener = (listener) => {
    socket.off('addUserToDisplay', listener);
};


//Remove Unavailable User
export const emitRemoveUser = (username) => {
    socket.emit('removeUser', username);
};

export const getRemoveUser = (listener) => {
    socket.on('removeUserFromDisplay', listener);
};

export const offRemoveUserListener = (listener) => {
    socket.off('removeUserFromDisplay', listener);
};

