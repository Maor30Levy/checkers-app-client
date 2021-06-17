export const setSocketAction = (socket) => ({
    type: "SET_SOCKET",
    socket
});

export const addMessageAction = (message) => ({
    type: "ADD_MESSAGE",
    message
});

export const setTypingAction = (isTyping) => ({
    type: "SET_TYPING",
    isTyping
});

export const startingTeamAction = (team) => ({
    type: "SET_TEAM",
    team
});

export const changeTeamAction = () => ({
    type: "CHANGE_TEAM"
});

export const initRoomAction = () => ({
    type: "INIT_ROOM"
});

export const isGameOnAction = () => ({
    type: "SET_GAMEON"
});

export const setOpponentAction = (opponent) => ({
    type: "SET_OPPONENT",
    opponent
});

export const setCounterAction = () => ({
    type: "SET_COUNTER"
});

export const initCounterAction = () => ({
    type: "INIT_COUNTER"
});

