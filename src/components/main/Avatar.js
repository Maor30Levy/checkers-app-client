import React, { useEffect, useState } from 'react'

export default function Avatar({ buffer }) {

    const [src, setSrc] = useState("./avatar/annonimous_avatar.png");
    useEffect(() => {
        setSrc(!!buffer ?
            `data:image/png;base64, ${(buffer).toString('base64')}` :
            "./avatar/annonimous_avatar.png")
    }, [buffer]);

    return (
        <div className="avatar-container">
            <img src={src} className="avatar" alt="avatar" />
        </div>
    )
}
