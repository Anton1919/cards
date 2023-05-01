import React from 'react';
import {Link} from "react-router-dom";
import s from './BackToPackList.module.scss';
import {PATHS} from "../../routes/PATHS";

const BackToPackList = () => {
    return (
        <Link className={s.backToPackList} to={PATHS.packsList}>
            Back to Packs List
        </Link>
    );
};

export default BackToPackList;