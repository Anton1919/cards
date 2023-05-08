import React from 'react';
import s from './Profile.module.scss';
import Card from 'common/components/Card/Card';
import check from 'assets/image/check.png';
import Button from 'common/components/Button/Button';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'common/routes/PATHS';
import {selectIsLoggedIn, selectStatus, selectUser} from 'common/selectors/selectors';
import BackToPackList from "common/components/BackToPackList/BackToPackList";
import EditableSpan from "features/profile/EditableSpan/EditableSpan";
import {logout} from "features/auth/authReducer/authReducer";
import LinearProgress from "@mui/material/LinearProgress";

const Profile = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus)

    if (status === 'loading') {
        return <LinearProgress/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATHS.login}/>;
    }

    const handleLogOut = () => {
        dispatch(logout());
    };

    return (
        <Card title={'Personal Information'}>
            <BackToPackList/>
            <div className={s.image}>
                <label>
                    <img src={check} alt='logo'/>
                    <input type='file' style={{display: 'none'}}/>
                </label>
            </div>

            <div className={s.nickname}>
                <EditableSpan name={user.name}/>
            </div>

            <div className={s.emailDescription}>
                <span>{user.email}</span>
            </div>

            <div className={s.btn}>
                <Button name={'Log out'} variant={'transparent'} handler={handleLogOut}/>
            </div>
        </Card>
    );
};

export default Profile;
