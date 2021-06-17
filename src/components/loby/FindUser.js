import React from 'react';

const FindUser = ({ filterUsers }) => {
    const onInputFindUser = (event) => {
        filterUsers(event.target.value.trim().toLowerCase());
    }
    return (
        <div className='search-users'>
            <input onInput={onInputFindUser} placeholder="Find User" />
        </div>
    )
};

export default FindUser;