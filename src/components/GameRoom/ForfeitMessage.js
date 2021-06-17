import React, { useEffect } from 'react';

const ForfeitMessage = ({ setIsGameForfieted, username }) => {
    useEffect(() => {
        const timeoutFunc = () => {
            setIsGameForfieted(false);
        }
        setTimeout(timeoutFunc, 1000);
    }, [setIsGameForfieted]);



    return (
        <div className="message-user">
            <div className="message-user__body">
                <h4> {username} has forfeited the game.</h4>
            </div>
        </div>
    )
};

export default ForfeitMessage;