import React, {useState} from 'react';
import s from './Picture.module.scss'

type PropsType = {
    deckCover: string
    defaultCover: string
}

const Picture = ({deckCover, defaultCover}: PropsType) => {
    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const errorHandler = () => {
        setIsAvaBroken(true)
    }

    return (
        <div className={s.packCoverWrapper}>
            <img src={isAvaBroken ? defaultCover : deckCover ? deckCover : defaultCover } alt="pack cover" onError={errorHandler}/>
        </div>
    );
};

export default Picture;