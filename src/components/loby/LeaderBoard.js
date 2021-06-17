import React, { useEffect, useState } from 'react';
import { getLeaderBoard } from '../../server/users';
import ElementLoader from '../main/ElementLoader';
import OverallRatings from './OverallRatings';
import RegionalRatings from './RegionalRatings';

const LeaderBoard = () => {
    const [overall, setOverall] = useState([]);
    const [region, setRegion] = useState([]);
    const [componentOn, setComponentOn] = useState(false);
    useEffect(() => {
        setComponentOn(true);
        getLeaderBoard('overall')
            .then((users) => {
                if (componentOn) {
                    setOverall(users);
                    setRegion(users);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setOverall([]);
                setRegion([]);
            });
        return () => {
            setOverall([]);
            setRegion([]);
            setComponentOn(false);
        }

    }, [componentOn]);
    return (
        <div className='leader-boards-container'>
            <h3>Regional Leaderboard:</h3>
            {region.length === 0 ? <ElementLoader /> : <RegionalRatings
                region={region} />}
            <h3>Overall Leaderboard:</h3>
            {overall.length === 0 ? <ElementLoader /> : <OverallRatings
                overall={overall} />}

        </div>
    )
};


export default LeaderBoard;