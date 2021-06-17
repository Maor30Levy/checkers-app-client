import { socket } from './socket/socket';
import axios from 'axios';
import { serverURL } from './users'

export const subscribeUser = async (user) => {
    try {
        user.socket = socket.id;
        const res = await axios.post(serverURL + '/subscribe', user);
        return res.data;
    } catch (err) {
        if (err.response) throw err.response.data;
        else {
            const error = new Error()
            error.message = 'Server is unavailable'
            throw error;
        }
    }
};

export const loginUser = async (data) => {
    const user = {};
    const identifier = Object.keys(data)[0];
    user[identifier] = data[identifier];
    user.password = data.password;
    user.socket = socket.id;
    try {
        const res = await axios.post(serverURL + '/login', user);
        if (!!(res.data.avatar)) res.data.avatar = Buffer.from(res.data.avatar);
        return res.data;
    } catch (err) {
        if (err.response) throw err.response.data;
        const error = new Error()
        error.message = 'Server is unavailable'
        throw error;
    }
};

export const logoutUser = async (token, username) => {
    try {
        const res = await axios.post(serverURL + '/logout', { token, username });
        return res.status
    } catch (err) {
        if (err.response) throw err.response.data;
        const error = new Error()
        error.message = 'Server is unavailable'
        throw error;
    }
};