import React, { useContext, useEffect, useState } from 'react';
import Rating from './Rating';
import { initUsersAction, userAction } from '../../actions/lobyActions';
import { LobyContext } from '../../context/LobyContext';
import FindUser from './FindUser';
import {
    getAddUser, offAddUserListener,
    getRemoveUser, offRemoveUserListener
} from '../../server/socket/loby-events';
import { getAvailableUsers } from '../../server/users';
import { LoginContext } from '../../context/LoginContext';

const LobyUsers = ({ setUserReciepient }) => {
    const { lobyData, lobyDataDispatch } = useContext(LobyContext);
    const { userData } = useContext(LoginContext);
    const [displayUsers, setDisplayUsers] = useState([...lobyData.users]);
    const [componentOn, setComponentOn] = useState(false);
    useEffect(() => {
        setComponentOn(true);
        getAvailableUsers()
            .then((unfilteredUsers) => {
                if (componentOn) {
                    const users = unfilteredUsers.filter(
                        (user) =>
                        (user.username !== userData.activeUser &&
                            user.available === 'true'
                        ))
                    // lobyDataDispatch(initUsersAction(users));
                    setDisplayUsers(users);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setDisplayUsers([]);

            });
        return () => {
            setDisplayUsers([]);
            setComponentOn(false);
        }
    }, [lobyDataDispatch, lobyData.users, userData.activeUser, componentOn])

    useEffect(() => {

        const getAddUserListener = (user) => {
            lobyDataDispatch(userAction("ADD_USER", user));
        };

        const getRemoveUserListener = (user) => {
            lobyDataDispatch(userAction("REMOVE_USER", user));
        };
        getAddUser(getAddUserListener);
        getRemoveUser(getRemoveUserListener);
        return () => {
            offAddUserListener(getAddUserListener);
            offRemoveUserListener(getRemoveUserListener);
        }
    }, [lobyData.users, lobyDataDispatch]);

    const filterUsers = (subString) => {
        const newUsers = lobyData.users;
        setDisplayUsers(subString === "" ?
            newUsers :
            newUsers.filter(
                (user) => user.username.toLowerCase().includes(subString)
            ));
    };

    const onClickUser = (event) => {
        const element = event.target;
        const user = element.children.length > 0 ?
            element.children[0].innerText :
            element.parentElement.children[0].innerText;
        setUserReciepient(user);
    }
    return (
        <div className='loby__users'>
            <h3>Users</h3>
            <FindUser
                filterUsers={filterUsers}
            />
            {displayUsers.map((user) =>
            (
                <div className='user' key={user.username} onClick={onClickUser}>
                    <div>{user.username}</div>
                    <Rating rating={user.rating} />
                </div>
            )
            )}
        </div >
    )
};
export default LobyUsers;