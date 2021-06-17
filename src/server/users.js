import axios from 'axios';
export const serverURL = 'http://localhost:3001'

export const getAvailableUsers = async () => {
    try {
        const response = await axios.get(serverURL + '/get-available-users');
        return response.data;
    } catch (err) {
        console.log(err)
    }
};

const updateUserData = async (token, key, value) => {
    try {
        await axios.patch(serverURL + '/update-user', { token, key, value });
    } catch (err) {
        console.log(err)
    }
};

export const updateUser = async (token, socketID) => {
    try {
        await updateUserData(token, 'opponentSocket', socketID);
        await updateUserData(token, 'available', false);
    } catch (err) {
        console.log(err)
    }
};

export const getImageBuffer = async (file) => {
    try {
        const formData = new FormData();
        formData.append("avatar", file);

        // serverURL + '/avatar'
        const response = await axios.post(serverURL + '/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const result = response.data;
        console.log(result)
        return result;
    } catch (err) {
        console.log(err)
    }
};

export const getLeaderBoard = async (leaderboard) => {
    try {
        const response = await axios.get(serverURL + '/get-leaderboard', { params: { leaderboard } });
        return response.data;
    } catch (err) {
        console.log(err)
    }
};

