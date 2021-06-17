import React from 'react';
import Avatar from '../main/Avatar';

const RegionalRatings = ({ region }) => {

    return (
        <div className='regional-ratings'>{
            region.map((user) => {
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
        </div >
    )
};

export default RegionalRatings;