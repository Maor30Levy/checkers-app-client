export const initialLobyData = {
    isUsersLoaded: true,
    users: [],
};

const LobyReducer = (lobyData, action) => {
    switch (action.type) {
        case "INIT":
            return {
                ...lobyData,
                isUsersLoaded: true,
                users: action.users
            };

        case "ADD_USER": {
            const newUsersArray = (lobyData.users).concat(action.user);
            return {
                ...lobyData,
                users: newUsersArray
            };
        }

        case "REMOVE_USER": {
            const newUsersArray = (lobyData.users).filter(({ user }) => user !== action.user);
            return {
                ...lobyData,
                users: newUsersArray
            };
        }

        default:
            return { ...lobyData };

    }
};


export default LobyReducer;