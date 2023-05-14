import React, {useState, MouseEvent} from 'react';
import s from './Account.module.scss';
import {selectAvatar, selectName} from 'common/selectors/selectors';
import {useAppDispatch, useAppSelector} from 'app/store';
import check from 'assets/image/check.png';
import CollapseMenu from 'common/components/CollapseMenu/collapseMenu';
import userIcon from 'assets/icons/user.svg';
import {PATHS} from 'common/routes/PATHS';
import {logout} from "features/auth/authReducer/authReducer";
import logoutIcon from 'assets/icons/logout.svg';

export type ContentType = {
    id: number;
    icon: string;
    title: string;
    link?: string;
    handler: (e: MouseEvent<HTMLDivElement>) => void
};

const Account = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(selectName);
    const avatar = useAppSelector(selectAvatar);

    const onToggleHandler = (e: any) => {
        e.stopPropagation();
        setCollapsed((prevOpen) => !prevOpen);
    };
    const onBlurHandler = () => {
        setCollapsed(false);
    };
    const onLogoutHandler = () => {
        dispatch(logout());
        setCollapsed(!collapsed);
    };

    const contentData = [
        {id: 0, icon: userIcon, title: 'Profile', link: PATHS.profile, handler: onToggleHandler},
        {id: 1, icon: logoutIcon, title: 'Log out', link: PATHS.login, handler: onLogoutHandler},
    ];

    return (
        <div className={s.container} onBlur={onBlurHandler} tabIndex={1}>
            <div className={s.userName} onClick={(e) => onToggleHandler(e)}>
                {userName}
            </div>
            <div className={s.image}>
                <img src={avatar ? avatar : check} alt='photo'/>
            </div>
            {collapsed && (
                <div className={s.menu}>
                    <CollapseMenu contentData={contentData}/>
                </div>
            )}
        </div>
    );
};

export default Account;
