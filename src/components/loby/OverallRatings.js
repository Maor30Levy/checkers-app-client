import React from 'react';
import Avatar from '../main/Avatar';

const OverallRatings = ({ overall }) => {

    return (
        <div className='overall-ratings'>{
            overall.map((user) => {
                if (!!user.avatar) user.avatar = Buffer.from(user.avatar)
                return (
                    <div className="leader" key={user.id}>
                        <div>{user.username}</div>
                        <Avatar buffer={user.avatar} />
                        <div>{user.rating}</div>
                    </div>
                )
            })
        }
        </div>
    )
};


export default OverallRatings;