import React from 'react';
import s from './Header.module.scss';
import {useAppSelector} from 'app/store';
import {useNavigate} from 'react-router-dom';
import {selectIsLoggedIn} from "common/selectors/selectors";
import Account from "features/profile/Account/Account";
import {PATHS} from "common/routes/PATHS";
import label from 'assets/image/header.png'
import Button from "common/components/Button/Button";

const Header = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const onHandler = () => {
        navigate(PATHS.login);
    };

    return (
        <header className={s.header}>
            <img className={s.image} src={label} alt='label'/>
            <div className={s.account}>{isLoggedIn ? <Account/> : <Button name={'Sign In'} handler={onHandler}/>}</div>
        </header>
    );
};

export default Header;
