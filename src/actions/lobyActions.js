export const initUsersAction = (users) => ({
    type: "INIT",
    users
});

export const userAction = (type, user) => ({
    type,
    user
});

