export const initialRoomData = {
    opponentSocket: '',
    messages: [],
    messagesID: [],
    isTyping: false,
    isTurnToPlay: false,
    opponent: '',
    isGameOn: false,
    messagesCounter: 0
};

const GameRoomReducer = (roomData, action) => {
    switch (action.type) {
        case "SET_SOCKET":
            return {
                ...roomData,
                opponentSocket: action.socket,
            };
        case "SET_OPPONENT":
            return {
                ...roomData,
                opponent: action.opponent,
            };
        case "SET_GAMEON":
            return {
                ...roomData,
                isGameOn: !roomData.isGameOn,
            };
        case "ADD_MESSAGE":
            {
                return {
                    ...roomData,
                    messages: [action.message].concat(roomData.messages),
                    messagesID: [action.message.id].concat(roomData.messagesID)
                };
            }
        case "SET_TYPING":
            return {
                ...roomData,
                isTyping: action.isTyping
            }
        case "SET_TEAM":
            return {
                ...roomData,
                isTurnToPlay: action.team
            }
        case "CHANGE_TEAM":
            return {
                ...roomData,
                isTurnToPlay: !(roomData.isTurnToPlay)
            }
        case "INIT_ROOM":
            return initialRoomData;
        case "SET_COUNTER":
            return {
                ...roomData,
                messagesCounter: roomData.messagesCounter + 1,
            };
        case "INIT_COUNTER":
            return {
                ...roomData,
                messagesCounter: 0,
            };
        default:
            return { ...roomData };
    }
};


export default GameRoomReducer;