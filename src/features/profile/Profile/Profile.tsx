import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.scss';
import Card from 'common/components/Card/Card';
import defaultAva from 'assets/image/defaultAva.png';
import Button from 'common/components/Button/Button';
import {useAppDispatch, useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {PATHS} from 'common/routes/PATHS';
import {selectAvatar, selectIsLoggedIn, selectName, selectStatus, selectUser} from 'common/selectors/selectors';
import BackToPackList from "common/components/BackToPackList/BackToPackList";
import EditableSpan from "features/profile/EditableSpan/EditableSpan";
import {logout} from "features/auth/authReducer/authReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {setAppError} from "app/appReducer";
import {onUpload} from "utils/uploadImage";
import {changeMyProfile} from "features/profile/Profile/profileReducer";

const Profile = () => {
    const avatar = useAppSelector(selectAvatar)
    const [ava, setAva] = useState(avatar)
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus)
    const profileName = useAppSelector(selectName)

    console.log(profileName)

    useEffect(() => {
        if (ava) {
            dispatch(changeMyProfile({name: profileName || 'Name', avatar: ava}))
        }
    }, [ava])

    if (status === 'loading') {
        return <LinearProgress/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATHS.login}/>;
    }

    const handleLogOut = () => {
        dispatch(logout());
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onUpload(e, setAva, dispatch)
    }

    const errorHandler = () => {
        dispatch(setAppError({error: 'Попробуй другую картинку'}))
    }

    return (
        <Card title={'Personal Information'}>
            <BackToPackList/>
            <div className={s.image}>
                <label>
                    <img src={ava ? ava : defaultAva} alt='logo' onError={errorHandler}/>
                    <input type='file' style={{display: 'none'}} onChange={uploadHandler}/>
                </label>
            </div>

            <div className={s.nickname}>
                <EditableSpan name={profileName}/>
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
