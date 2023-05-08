import React from 'react';
import s from './NothingFound.module.scss'

type NothingFoundType = {
    message: string
}

const NothingFound = ({message}: NothingFoundType) => {
    return (
        <div className={s.warningMessage}>
            <p>
                {message}
            </p>

        </div>
    );
};

export default NothingFound;