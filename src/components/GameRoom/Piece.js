import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { GameRoomContext } from '../../context/GameRoomContext';

export default function Piece({ piece: { type, id } }) {
    const { roomData } = useContext(GameRoomContext);
    const [{ isDragging }, drag] = useDrag({
        type: 'piece', id,
        item: { id },
        canDrag: () => (roomData.isTurnToPlay),
        collect: (monitor) => ({
            item: monitor.getItem(),
            isDragging: !!monitor.isDragging()
        })
    });



    return (
        <div className={type} ref={drag}
            style={{
                opacity: isDragging ? 0 : 1
            }}
        >
        </div>
    )
}
